import React, { useState } from 'react';
import DemographicsScreen from './components/DemographicsScreen';
import SymptomsScreen from './components/SymptomsScreen';
import ClinicalSignsScreen from './components/ClinicalSignsScreen';
import ExposureScreen from './components/ExposureScreen';
import RDTScreen from './components/RDTScreen';
import ResultsScreen from './components/ResultsScreen';
import StepIndicator from './components/StepIndicator';
import { runInference } from './engine';
import { saveConsultation } from './firebase';
import './App.css';

const initialState = {
  age: '', sex: '', pregnancyStatus: 'no', locationZone: '',
  fever: false, chills: false, headache: false, vomiting: false,
  diarrhoea: false, lossOfAppetite: false, bodyAches: false, durationDays: '',
  temperature: '', respiratoryRate: '', bloodPressure: '', consciousnessLevel: 'alert',
  pallor: false, jaundice: false,
  recentTravel: false, mosquitoExposure: false, priorEpisodes: false, priorTreatment: false,
  rdtResult: '', rdtSpecies: '',
};

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialState);
  const [results, setResults] = useState(null);

  const update = (fields) => setData(prev => ({ ...prev, ...fields }));

  const handleFinish = async () => {
    console.log("handleFinish called");
    const output = runInference(data);
    console.log("inference output:", output);
    setResults(output);
    setStep(6);
    await saveConsultation(data, output);
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="app-header">
          <h1>MalariaExpert</h1>
          <p>Early Malaria Diagnosis Support System</p>
        </div>
        <StepIndicator current={step} total={6} />
        {step === 1 && <DemographicsScreen data={data} update={update} next={() => setStep(2)} />}
        {step === 2 && <SymptomsScreen data={data} update={update} next={() => setStep(3)} back={() => setStep(1)} />}
        {step === 3 && <ClinicalSignsScreen data={data} update={update} next={() => setStep(4)} back={() => setStep(2)} />}
        {step === 4 && <ExposureScreen data={data} update={update} next={() => setStep(5)} back={() => setStep(3)} />}
        {step === 5 && <RDTScreen data={data} update={update} next={handleFinish} back={() => setStep(4)} />}
        {step === 6 && <ResultsScreen results={results} data={data} restart={() => { setStep(1); setData(initialState); setResults(null); }} />}
      </div>
    </div>
  );
}