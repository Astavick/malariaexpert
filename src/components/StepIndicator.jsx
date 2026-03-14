import React from 'react';

export default function StepIndicator({ current, total }) {
  return (
    <div style={{ padding: '12px 20px', background: '#f0f7f2', borderBottom: '1px solid #d0e8d8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '13px', color: '#1F6B3A', fontWeight: 'bold' }}>Step {current} of {total}</span>
        <span style={{ fontSize: '13px', color: '#888' }}>
          {current === 1 && 'Patient Demographics'}
          {current === 2 && 'Symptom Assessment'}
          {current === 3 && 'Clinical Signs'}
          {current === 4 && 'Exposure History'}
          {current === 5 && 'RDT Result'}
          {current === 6 && 'Results'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: '5px', borderRadius: '3px',
            backgroundColor: i < current ? '#1F6B3A' : '#d0e8d8'
          }} />
        ))}
      </div>
    </div>
  );
}