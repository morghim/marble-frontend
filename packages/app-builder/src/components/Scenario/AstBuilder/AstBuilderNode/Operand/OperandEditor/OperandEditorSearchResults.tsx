import { scenarioI18n } from '@app-builder/components';
import { matchSorter } from 'match-sorter';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuGroup, MenuGroupLabel } from 'ui-design-system';

import {
  useCoerceToConstant,
  useOperandEditorActions,
  useOptions,
  useSearchValue,
} from './OperandEditorProvider';
import { CoercedConstantOption, OperandOption } from './OperandMenuItem';

export function OperandEditorSearchResults() {
  const { t } = useTranslation(scenarioI18n);
  const searchValue = useSearchValue();
  const { onOptionClick } = useOperandEditorActions();

  const coerceToConstant = useCoerceToConstant();
  const constantOptions = React.useMemo(() => {
    return (
      coerceToConstant?.(searchValue).map((option) => ({
        key: `${option.displayName}-${option.dataType}`,
        ...option,
        onClick: () => {
          onOptionClick(option.astNode);
        },
      })) ?? []
    );
  }, [coerceToConstant, onOptionClick, searchValue]);

  const options = useOptions();
  const matchOptions = React.useMemo(() => {
    return matchSorter(options, searchValue, {
      keys: ['displayName'],
    }).map((option) => ({
      key: `${option.displayName}-${option.dataType}-${option.operandType}`,
      ...option,
      searchValue,
      onClick: () => {
        onOptionClick(option.astNode);
      },
    }));
  }, [onOptionClick, options, searchValue]);

  return (
    <>
      {constantOptions.length > 0 ? (
        <MenuGroup className="flex w-full flex-col gap-1">
          <MenuGroupLabel className="sr-only">Constants</MenuGroupLabel>
          {constantOptions.map((constant) => (
            <CoercedConstantOption {...constant} key={constant.key} />
          ))}
        </MenuGroup>
      ) : null}
      <MenuGroup className="flex w-full flex-col gap-1">
        <div className="flex min-h-10 select-none flex-row items-center gap-1 p-2">
          <span className="flex w-full items-baseline gap-1">
            <MenuGroupLabel className="text-grey-100 text-m flex items-baseline whitespace-pre font-semibold">
              {t('scenarios:edit_operand.result', {
                count: matchOptions.length,
              })}
            </MenuGroupLabel>
            <span className="text-grey-25 text-xs font-medium">
              {matchOptions.length}
            </span>
          </span>
        </div>
        {matchOptions.map((option) => (
          <OperandOption {...option} key={option.key} />
        ))}
      </MenuGroup>
    </>
  );
}
