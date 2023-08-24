import {
  type EvaluationError,
  type NodeEvaluation,
  type ScenarioValidation,
} from '@app-builder/models';
import invariant from 'tiny-invariant';

// return just an array of error from a recursive evaluation
function flattenNodeEvaluationErrors(
  evaluation: NodeEvaluation
): EvaluationError[] {
  return [
    ...(evaluation.state === 'invalid' ? evaluation.errors : []),
    ...evaluation.children.flatMap(flattenNodeEvaluationErrors),
    ...Object.values(evaluation.namedChildren).flatMap(
      flattenNodeEvaluationErrors
    ),
  ];
}

export function countScenarioValidationErrors(
  validation: ScenarioValidation
): number {
  return (
    validation.errors.length +
    [
      validation.triggerEvaluation,
      ...Object.values(validation.rulesEvaluations),
    ].reduce(
      (acc, evaluation) => acc + flattenNodeEvaluationErrors(evaluation).length,
      0
    )
  );
}

export function findRuleValidation(
  validation: ScenarioValidation,
  ruleId: string
): NodeEvaluation {
  const evaluation = validation.rulesEvaluations[ruleId];

  invariant(evaluation !== undefined, `Rule ${ruleId} not found in validation`);

  return evaluation;
}

export function countNodeEvaluationErrors(evaluation: NodeEvaluation): number {
  return flattenNodeEvaluationErrors(evaluation).length;
}
