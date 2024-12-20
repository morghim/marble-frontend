import {
  ErrorComponent,
  navigationI18n,
  SidebarButton,
  SidebarLink,
} from '@app-builder/components';
import {
  HelpCenter,
  useMarbleCoreResources,
} from '@app-builder/components/HelpCenter';
import {
  LeftSidebar,
  ToggleSidebar,
} from '@app-builder/components/Layout/LeftSidebar';
import { UserInfo } from '@app-builder/components/UserInfo';
import { isMarbleAdmin, isMarbleCoreUser } from '@app-builder/models';
import { useRefreshToken } from '@app-builder/routes/ressources+/auth+/refresh';
import {
  ChatlioButton,
  ChatlioProvider,
} from '@app-builder/services/chatlio/ChatlioWidget';
import { chatlioScript } from '@app-builder/services/chatlio/script';
import { serverServices } from '@app-builder/services/init.server';
import { OrganizationTagsContextProvider } from '@app-builder/services/organization/organization-tags';
import { OrganizationUsersContextProvider } from '@app-builder/services/organization/organization-users';
import {
  segment,
  useSegmentIdentification,
} from '@app-builder/services/segment';
import { getFullName } from '@app-builder/services/user';
import { getClientEnv } from '@app-builder/utils/environment';
import { conflict, forbidden } from '@app-builder/utils/http/http-responses';
import { CONFLICT } from '@app-builder/utils/http/http-status-codes';
import { getRoute } from '@app-builder/utils/routes';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import {
  Form,
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { captureRemixErrorBoundaryError } from '@sentry/remix';
import { type Namespace } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, ScrollArea } from 'ui-design-system';
import { Icon } from 'ui-icons';

import { getSettings } from './settings+/_layout';

export async function loader({ request }: LoaderFunctionArgs) {
  const { authService, featureAccessService } = serverServices;
  const { user, organization } = await authService.isAuthenticated(request, {
    failureRedirect: getRoute('/sign-in'),
  });

  if (isMarbleAdmin(user)) {
    throw conflict("Marble Admins can't access this app.");
  }

  if (!isMarbleCoreUser(user)) {
    throw forbidden('Only Marble Core users can access this app.');
  }

  const [
    organizationDetail,
    orgUsers,
    orgTags,
    settings,
    isAnalyticsAvailable,
    isWorkflowsAvailable,
  ] = await Promise.all([
    organization.getCurrentOrganization(),
    organization.listUsers(),
    organization.listTags(),
    getSettings(user, featureAccessService),
    featureAccessService.isAnalyticsAvailable(user),
    featureAccessService.isWorkflowsAvailable(),
  ]);

  const firstSettings = settings[0];

  return json({
    user,
    orgUsers,
    organization: organizationDetail,
    orgTags,
    featuresAccess: {
      isAnalyticsAvailable,
      isWorkflowsAvailable,
      settings:
        firstSettings !== undefined
          ? {
              isAvailable: true as const,
              to: firstSettings.to,
            }
          : {
              isAvailable: false as const,
            },
    },
  });
}

export const handle = {
  i18n: ['common', ...navigationI18n] satisfies Namespace,
  scripts: () => [
    ...(getClientEnv('CHATLIO_WIDGET_ID') ? [chatlioScript] : []),
  ],
};

export default function Builder() {
  const { user, orgUsers, organization, orgTags, featuresAccess } =
    useLoaderData<typeof loader>();
  useSegmentIdentification(user);

  // Refresh is done in the JSX because it needs to be done in the browser
  // This is only added here to prevent "auto sign-in" on /sign-in pages... (/logout do not trigger logout from Firebase)
  useRefreshToken();

  const chatlioWidgetId = getClientEnv('CHATLIO_WIDGET_ID');
  const marbleCoreResources = useMarbleCoreResources();

  return (
    <OrganizationUsersContextProvider orgUsers={orgUsers}>
      <OrganizationTagsContextProvider orgTags={orgTags}>
        <div className="flex h-full flex-1 flex-row overflow-hidden">
          <LeftSidebar>
            <div className="h-24 px-2 pt-3">
              <UserInfo
                email={user.actorIdentity.email}
                firstName={user.actorIdentity.firstName}
                lastName={user.actorIdentity.lastName}
                role={user.role}
                orgOrPartnerName={organization.name}
              />
            </div>
            <ScrollArea.Root className="flex flex-1 flex-col" type="auto">
              <ScrollArea.Viewport>
                <nav className="p-2">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <SidebarLink
                        labelTKey="navigation:scenarios"
                        to={getRoute('/scenarios/')}
                        Icon={(props) => <Icon icon="scenarios" {...props} />}
                      />
                    </li>
                    <li>
                      <SidebarLink
                        labelTKey="navigation:lists"
                        to={getRoute('/lists/')}
                        Icon={(props) => <Icon icon="lists" {...props} />}
                      />
                    </li>
                    <li>
                      <SidebarLink
                        labelTKey="navigation:decisions"
                        to={getRoute('/decisions/')}
                        Icon={(props) => <Icon icon="decision" {...props} />}
                      />
                    </li>
                    <li>
                      <SidebarLink
                        labelTKey="navigation:scheduledExecutions"
                        to={getRoute('/scheduled-executions')}
                        Icon={(props) => (
                          <Icon icon="scheduled-execution" {...props} />
                        )}
                      />
                    </li>
                    <li>
                      <SidebarLink
                        labelTKey="navigation:caseManager"
                        to={getRoute('/cases/')}
                        Icon={(props) => (
                          <Icon icon="case-manager" {...props} />
                        )}
                      />
                    </li>
                    {featuresAccess.isWorkflowsAvailable ? (
                      <li>
                        <SidebarLink
                          labelTKey="navigation:workflows"
                          to={getRoute('/workflows')}
                          Icon={(props) => (
                            <Icon icon="rule-settings" {...props} />
                          )}
                        />
                      </li>
                    ) : null}
                    {featuresAccess.isAnalyticsAvailable ? (
                      <li>
                        <SidebarLink
                          labelTKey="navigation:analytics"
                          to={getRoute('/analytics')}
                          Icon={(props) => <Icon icon="analytics" {...props} />}
                        />
                      </li>
                    ) : null}
                  </ul>
                </nav>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <nav className="p-2 pb-4">
              <ul className="flex flex-col gap-2">
                <li>
                  <SidebarLink
                    labelTKey="navigation:data"
                    to={getRoute('/data')}
                    Icon={(props) => <Icon icon="harddrive" {...props} />}
                  />
                </li>
                <li>
                  <SidebarLink
                    labelTKey="navigation:api"
                    to={getRoute('/api')}
                    Icon={(props) => <Icon icon="world" {...props} />}
                  />
                </li>
                {featuresAccess.settings.isAvailable ? (
                  <li key="navigation:settings">
                    <SidebarLink
                      labelTKey="navigation:settings"
                      to={featuresAccess.settings.to}
                      Icon={(props) => <Icon icon="settings" {...props} />}
                    />
                  </li>
                ) : null}
                <li>
                  <ChatlioProvider
                    chatlio={
                      chatlioWidgetId
                        ? {
                            user: {
                              id: user.actorIdentity.userId,
                              email: user.actorIdentity.email,
                              name: getFullName(user.actorIdentity),
                            },
                            organization: {
                              id: organization.id,
                              name: organization.name,
                            },
                            widgetid: chatlioWidgetId,
                            marbleProduct: 'marble-core',
                          }
                        : undefined
                    }
                  >
                    <HelpCenter
                      defaultTab={marbleCoreResources.defaultTab}
                      resources={marbleCoreResources.resources}
                      MenuButton={
                        <SidebarButton
                          labelTKey="navigation:helpCenter"
                          Icon={(props) => (
                            <Icon icon="helpcenter" {...props} />
                          )}
                        />
                      }
                      ChatWithUsButton={<ChatlioButton />}
                    />
                  </ChatlioProvider>
                </li>
                <li>
                  <ToggleSidebar />
                </li>
              </ul>
            </nav>
          </LeftSidebar>

          <Outlet />
        </div>
      </OrganizationTagsContextProvider>
    </OrganizationUsersContextProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation(handle.i18n);

  let errorComponent;
  // Handle Marble Admins, do not capture error in Sentry
  if (isRouteErrorResponse(error) && error.status === CONFLICT) {
    errorComponent = (
      <div className="bg-purple-05 flex size-full items-center justify-center">
        <div className="bg-grey-00 flex max-w-md flex-col items-center gap-4 rounded-2xl p-10 text-center shadow-md">
          <h1 className="text-l text-purple-110 font-semibold">
            {t('common:error_boundary.marble_admin.title')}
          </h1>
          <p className="text-s mb-6">
            {t('common:error_boundary.marble_admin.subtitle')}
          </p>
          <div className="mb-1">
            <Form action={getRoute('/ressources/auth/logout')} method="POST">
              <Button
                type="submit"
                onClick={() => {
                  void segment.reset();
                }}
              >
                <Icon icon="logout" className="size-5" />
                {t('common:auth.logout')}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  } else {
    captureRemixErrorBoundaryError(error);

    errorComponent = <ErrorComponent error={error} />;
  }

  return (
    <div className="bg-purple-05 flex size-full items-center justify-center">
      <div className="bg-grey-00 flex max-w-md rounded-2xl p-10 shadow-md">
        {errorComponent}
      </div>
    </div>
  );
}
