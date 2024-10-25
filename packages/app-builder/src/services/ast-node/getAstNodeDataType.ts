import {
  type AstNode,
  type DataModel,
  type DataType,
  isConstant,
  isDataAccessorAstNode,
  isFuzzyMatchComparator,
  isTimeAdd,
  isTimeNow,
  type TableModel,
} from '@app-builder/models';
import * as R from 'remeda';

import { getDataAccessorAstNodeField } from './getDataAccessorAstNodeField';

export function getAstNodeDataType(
  astNode: AstNode,
  context: {
    triggerObjectTable: TableModel;
    dataModel: DataModel;
  },
): DataType {
  if (isConstant(astNode)) {
    const { constant } = astNode;
    if (R.isString(constant)) {
      //TODO(combobox): handle Timestamp here, if we do manipulate them as ISOstring
      return 'String';
    }

    if (R.isNumber(constant)) {
      return Number.isInteger(constant) ? 'Int' : 'Float';
    }

    if (R.isBoolean(constant)) {
      return 'Bool';
    }

    if (R.isArray(constant)) {
      if (constant.every(R.isString)) return 'String[]';
      if (constant.every(R.isNumber)) {
        return constant.every(Number.isInteger) ? 'Int[]' : 'Float[]';
      }
      if (constant.every(R.isBoolean)) return 'Bool[]';
    }

    return 'unknown';
  }

  if (isDataAccessorAstNode(astNode)) {
    const field = getDataAccessorAstNodeField(astNode, context);
    return field.dataType;
  }

  if (isFuzzyMatchComparator(astNode)) {
    return 'Bool';
  }

  if (isTimeNow(astNode) || isTimeAdd(astNode)) {
    return 'Timestamp';
  }

  return 'unknown';
}