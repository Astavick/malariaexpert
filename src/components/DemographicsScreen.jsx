import React from 'react';

export default function DemographicsScreen({ data, update, next }) {
  const handleNext = () => {
    if (!data.age || !data.sex || !data.locationZone) {
      alert('Please fill in all required fields.');
      return;
    }
    next();
  };

  return (
    <div className="screen">
      <h2>Patient Demographics</h2>

      <div className="form-group">
        <label>Age (years)</label>
        <input
          type="number"
          placeholder="Enter age"
          value={data.age}
          onChange={e => update({ age: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Sex</label>
        <select value={data.sex} onChange={e => update({ sex: e.target.value })}>
          <option value="">Select sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Pregnancy Status</label>
        <select value={data.pregnancyStatus} onChange={e => update({ pregnancyStatus: e.target.value })}>
          <option value="no">Not Pregnant / Not Applicable</option>
          <option value="yes">Pregnant</option>
        </select>
      </div>

      <div className="form-group">
        <label>Location / Transmission Zone</label>
        <select value={data.locationZone} onChange={e => update({ locationZone: e.target.value })}>
          <option value="">Select zone</option>
          <option value="high">High Transmission Zone</option>
          <option value="low">Low Transmission Zone</option>
        </select>
      </div>

      <div className="btn-row">
        <button className="btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}