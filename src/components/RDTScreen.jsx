import React from 'react';

export default function RDTScreen({ data, update, next, back }) {
  const handleNext = () => {
    if (!data.rdtResult) {
      alert('Please select an RDT result.');
      return;
    }
    next();
  };

  return (
    <div className="screen">
      <h2>RDT Result</h2>

      <div className="form-group">
        <label>Rapid Diagnostic Test (RDT) Result</label>
        <select
          value={data.rdtResult}
          onChange={e => update({ rdtResult: e.target.value })}
        >
          <option value="">Select result</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="notdone">Not Done</option>
        </select>
      </div>

      {data.rdtResult === 'positive' && (
        <div className="form-group">
          <label>Parasite Species (if shown on RDT)</label>
          <select
            value={data.rdtSpecies}
            onChange={e => update({ rdtSpecies: e.target.value })}
          >
            <option value="">Unknown / Not Shown</option>
            <option value="falciparum">Plasmodium falciparum</option>
            <option value="vivax">Plasmodium vivax</option>
            <option value="other">Other species</option>
          </select>
        </div>
      )}

      <div className="btn-row">
        <button className="btn-secondary" onClick={back}>Back</button>
        <button className="btn-primary" onClick={(e) => { e.preventDefault(); handleNext(); }}>Submit</button>
      </div>
    </div>
  );
}