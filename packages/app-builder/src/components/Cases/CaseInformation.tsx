import { EditCaseInbox } from '@app-builder/routes/ressources/cases/edit-inbox';
import { EditCaseName } from '@app-builder/routes/ressources/cases/edit-name';
import { EditCaseTags } from '@app-builder/routes/ressources/cases/edit-tags';
import { formatDateTime } from '@app-builder/utils/format';
import { type Case, type InboxDto } from 'marble-api';
import { useTranslation } from 'react-i18next';
import { Collapsible } from 'ui-design-system';

import { CaseContributors } from './CaseContributors';
import { casesI18n } from './cases-i18n';

export function CaseInformation({
  caseDetail: { created_at, name, id, contributors, tags },
  inbox,
}: {
  caseDetail: Case;
  inbox: InboxDto;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation(casesI18n);

  return (
    <Collapsible.Container className="bg-grey-00">
      <Collapsible.Title>
        {t('cases:case_detail.informations')}
      </Collapsible.Title>
      <Collapsible.Content>
        <div className="grid grid-cols-[max-content_1fr] grid-rows-[repeat(5,_minmax(40px,_min-content))] items-center gap-x-10 gap-y-2">
          <CaseLabel>{t('cases:case.name')}</CaseLabel>
          <EditCaseName caseId={id} name={name} />
          <CaseLabel>{t('cases:case.date')}</CaseLabel>
          <div>
            {formatDateTime(created_at, { language, timeStyle: undefined })}
          </div>
          <CaseLabel>{t('cases:case.inbox')}</CaseLabel>
          <EditCaseInbox defaultInbox={inbox} caseId={id} />
          <CaseLabel>{t('cases:case.tags')}</CaseLabel>
          <EditCaseTags
            defaultCaseTagIds={tags.map(({ tag_id }) => tag_id)}
            caseId={id}
          />
          <CaseLabel>{t('cases:case.contributors')}</CaseLabel>
          <CaseContributors contributors={contributors} />
        </div>
      </Collapsible.Content>
    </Collapsible.Container>
  );
}

const CaseLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold capitalize">{children}</div>
);
