import React from 'react';

const symptoms = [
  { key: 'fever', label: 'Fever' },
  { key: 'chills', label: 'Chills / Rigors' },
  { key: 'headache', label: 'Headache' },
  { key: 'vomiting', label: 'Vomiting' },
  { key: 'diarrhoea', label: 'Diarrhoea' },
  { key: 'lossOfAppetite', label: 'Loss of Appetite' },
  { key: 'bodyAches', label: 'Body Aches' },
];

export default function SymptomsScreen({ data, update, next, back }) {
  const handleNext = () => {
    if (!data.durationDays) {
      alert('Please enter the number of days symptoms have been present.');
      return;
    }
    next();
  };

  return (
    <div className="screen">
      <h2>Symptom Assessment</h2>

      <div className="form-group">
        <label>Duration of Symptoms (days)</label>
        <input
          type="number"
          placeholder="Enter number of days"
          value={data.durationDays}
          onChange={e => update({ durationDays: e.target.value })}
          min="0"
          max="30"
        />
      </div>

      <div className="form-group">
        <label>Select all symptoms present:</label>
      </div>

      <div className="toggle-group">
        {symptoms.map(s => (
          <div
            key={s.key}
            className={`toggle-item ${data[s.key] ? 'active' : ''}`}
            onClick={() => update({ [s.key]: !data[s.key] })}
          >
            <span>{s.label}</span>
            <div className="toggle-dot" />
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={back}>Back</button>
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}