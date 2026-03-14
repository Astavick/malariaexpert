import { rules } from './rules';

export function runInference(data) {
  const firedRules = [];

  for (const rule of rules) {
    const allConditionsMet = rule.conditions.every(condition => {
      const value = data[condition.field];
      if (condition.operator === '>') return parseFloat(value) > condition.value;
      if (condition.operator === '<') return parseFloat(value) < condition.value;
     if (condition.operator === '==') return String(value) === String(condition.value);
      if (condition.operator === '===') return value === condition.value;
      return false;
    });

    if (allConditionsMet) {
      firedRules.push(rule);
    }
  }

  // Conflict resolution — priority order
  const severeRule = firedRules.find(r => r.conclusion.classification === 'SEVERE_MALARIA');
  if (severeRule) return buildResult(severeRule, firedRules);

  const uncomplicatedRule = firedRules.find(r => r.conclusion.classification === 'UNCOMPLICATED_MALARIA');
  if (uncomplicatedRule) return buildResult(uncomplicatedRule, firedRules);

  const nonMalarialRule = firedRules.find(r => r.conclusion.classification === 'NON_MALARIAL_FEVER');
  if (nonMalarialRule) return buildResult(nonMalarialRule, firedRules);

  // No rules fired — indeterminate
  return {
    classification: 'INDETERMINATE',
    confidence: 0,
    action: 'FURTHER_INVESTIGATION',
    treatment: 'Insufficient data to classify. Please review patient data and consult a clinician.',
    referralRequired: false,
    firedRules: [],
  };
}

function buildResult(winningRule, allFiredRules) {
  return {
    classification: winningRule.conclusion.classification,
    confidence: winningRule.confidence,
    action: winningRule.conclusion.action,
    treatment: winningRule.treatment,
    referralRequired: winningRule.conclusion.action === 'URGENT_REFERRAL',
    firedRules: allFiredRules,
  };
}