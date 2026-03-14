import React from 'react';

const exposureItems = [
  { key: 'recentTravel', label: 'Recent travel to a malaria-endemic area' },
  { key: 'mosquitoExposure', label: 'Recent mosquito exposure (no net / outdoors at night)' },
  { key: 'priorEpisodes', label: 'Previous malaria episodes' },
  { key: 'priorTreatment', label: 'Already received antimalarial treatment for this episode' },
];

export default function ExposureScreen({ data, update, next, back }) {
  return (
    <div className="screen">
      <h2>Exposure History</h2>

      <div className="form-group">
        <label>Select all that apply:</label>
      </div>

      <div className="toggle-group">
        {exposureItems.map(item => (
          <div
            key={item.key}
            className={`toggle-item ${data[item.key] ? 'active' : ''}`}
            onClick={() => update({ [item.key]: !data[item.key] })}
          >
            <span>{item.label}</span>
            <div className="toggle-dot" />
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={back}>Back</button>
        <button className="btn-primary" onClick={next}>Next</button>
      </div>
    </div>
  );
}