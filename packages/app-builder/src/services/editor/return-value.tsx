import { type ReturnValue } from '@app-builder/models/node-evaluation';
import { useFormatLanguage } from '@app-builder/utils/format';
import { type TFunction } from 'i18next';
import { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { noop } from 'typescript-utils';

import { formatConstant } from '../ast-node/formatConstant';

export function formatReturnValue(
  returnValue: ReturnValue | undefined,
  config: {
    t: TFunction<['common', 'scenarios'], undefined>;
    language: string;
  },
) {
  if (returnValue?.isOmitted === false) {
    return formatConstant(returnValue.value, config);
  }
  return undefined;
}

export function useFormatReturnValue() {
  const { t } = useTranslation(['common', 'scenarios']);
  const language = useFormatLanguage();

  return useCallback(
    (returnValue?: ReturnValue) =>
      formatReturnValue(returnValue, { t, language }),
    [t, language],
  );
}

const DisplayReturnValues = createContext<[boolean, (val: boolean) => void]>([
  false,
  noop,
]);
DisplayReturnValues.displayName = 'DisplayReturnValues';

export function DisplayReturnValuesProvider({
  children,
  initialDisplayReturnValues,
}: {
  children: React.ReactNode;
  initialDisplayReturnValues?: boolean;
}) {
  const value = useState(initialDisplayReturnValues ?? false);
  return (
    <DisplayReturnValues.Provider value={value}>
      {children}
    </DisplayReturnValues.Provider>
  );
}

export function useDisplayReturnValues() {
  return useContext(DisplayReturnValues);
}

export function adaptBooleanReturnValue(returnValue?: ReturnValue) {
  if (
    returnValue !== undefined &&
    returnValue.isOmitted === false &&
    typeof returnValue.value === 'boolean'
  ) {
    return { value: returnValue.value };
  }
  return undefined;
}
