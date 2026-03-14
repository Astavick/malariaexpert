import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvtyzURW4c_jgT7nUYFiTORgs5pbIyot8",
  authDomain: "malariaexpert.firebaseapp.com",
  projectId: "malariaexpert",
  storageBucket: "malariaexpert.firebasestorage.app",
  messagingSenderId: "87357031255",
  appId: "1:87357031255:web:31f38e85ee613707f8f412"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveConsultation(data, results) {
  console.log("Attempting to save to Firebase...");
  try {
    const docRef = await addDoc(collection(db, "consultations"), {
      timestamp: serverTimestamp(),
      locationZone: data.locationZone,
      ageGroup: Number(data.age) < 5 ? "under5" : Number(data.age) < 18 ? "5to18" : "adult",
      sex: data.sex,
      pregnancyStatus: data.pregnancyStatus,
      classification: results.classification,
      confidence: results.confidence,
      referralRequired: results.referralRequired,
      rdtResult: data.rdtResult,
      fever: data.fever,
      durationDays: Number(data.durationDays),
    });
    console.log("Saved successfully! Document ID:", docRef.id);
  } catch (error) {
    console.error("Firebase error:", error.message);
  }
}