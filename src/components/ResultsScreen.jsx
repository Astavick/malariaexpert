import React from 'react';

const classificationLabels = {
  SEVERE_MALARIA: 'Severe Malaria',
  UNCOMPLICATED_MALARIA: 'Uncomplicated Malaria',
  NON_MALARIAL_FEVER: 'Non-Malarial Fever',
  INDETERMINATE: 'Indeterminate',
};

const bannerClass = {
  SEVERE_MALARIA: 'banner-severe',
  UNCOMPLICATED_MALARIA: 'banner-uncomplicated',
  NON_MALARIAL_FEVER: 'banner-nonmalarial',
  INDETERMINATE: 'banner-indeterminate',
};

export default function ResultsScreen({ results, restart }) {
  if (!results) return null;

  return (
    <div className="screen">
      <h2>Diagnosis Results</h2>

      <div className={`result-banner ${bannerClass[results.classification]}`}>
        <h3>{classificationLabels[results.classification]}</h3>
        {results.confidence > 0 && (
          <p>Confidence: {results.confidence}%</p>
        )}
        {results.referralRequired && (
          <p style={{ fontWeight: 'bold', marginTop: '6px' }}>⚠ Urgent Referral Required</p>
        )}
      </div>

      <div className="result-section">
        <h4>Recommended Treatment</h4>
        <p>{results.treatment}</p>
      </div>

      {results.firedRules && results.firedRules.length > 0 && (
        <div className="result-section">
          <h4>Reasoning Trace</h4>
          {results.firedRules.map(rule => (
            <div key={rule.id} className="rule-trace-item">
              <strong>{rule.name}</strong> (Confidence: {rule.confidence}%)<br />
              {rule.explanation}<br />
              <span style={{ fontSize: '12px', color: '#888' }}>Source: {rule.source}</span>
            </div>
          ))}
        </div>
      )}

      <div className="btn-row">
        <button className="btn-primary" onClick={restart}>Start New Consultation</button>
      </div>
    </div>
  );
}