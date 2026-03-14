import React from 'react';

export default function ClinicalSignsScreen({ data, update, next, back }) {
  const handleNext = () => {
    if (!data.temperature || !data.respiratoryRate || !data.consciousnessLevel) {
      alert('Please fill in temperature, respiratory rate, and consciousness level.');
      return;
    }
    next();
  };

  return (
    <div className="screen">
      <h2>Clinical Signs</h2>

      <div className="form-group">
        <label>Temperature (°C)</label>
        <input
          type="number"
          placeholder="e.g. 38.5"
          value={data.temperature}
          onChange={e => update({ temperature: e.target.value })}
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label>Respiratory Rate (breaths/min)</label>
        <input
          type="number"
          placeholder="e.g. 24"
          value={data.respiratoryRate}
          onChange={e => update({ respiratoryRate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>
          Blood Pressure (mmHg)
          <span className="optional-label">(optional — enter if equipment available)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. 120/80"
          value={data.bloodPressure}
          onChange={e => update({ bloodPressure: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Level of Consciousness</label>
        <select
          value={data.consciousnessLevel}
          onChange={e => update({ consciousnessLevel: e.target.value })}
        >
          <option value="alert">Alert — fully conscious</option>
          <option value="confused">Confused — responds but disoriented</option>
          <option value="altered">Altered — only responds to pain</option>
          <option value="unconscious">Unconscious — no response</option>
        </select>
      </div>

      <div className="toggle-group">
        <div
          className={`toggle-item ${data.pallor ? 'active' : ''}`}
          onClick={() => update({ pallor: !data.pallor })}
        >
          <span>Pallor (paleness of skin)</span>
          <div className="toggle-dot" />
        </div>
        <div
          className={`toggle-item ${data.jaundice ? 'active' : ''}`}
          onClick={() => update({ jaundice: !data.jaundice })}
        >
          <span>Jaundice (yellowing of skin/eyes)</span>
          <div className="toggle-dot" />
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={back}>Back</button>
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}