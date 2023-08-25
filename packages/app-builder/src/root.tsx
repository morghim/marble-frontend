import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type V2_MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { Tooltip } from '@ui-design-system';
import { type Namespace } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from 'remix-utils';

import { getToastMessage, MarbleToaster } from './components/MarbleToaster';
import { serverServices } from './services/init.server';
import tailwindStyles from './tailwind.css';
import { getClientEnvVars } from './utils/environment.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: '/fonts/Inter/inter.css' },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicons/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicons/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicons/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'icon', href: '/favicon.ico' },
];

export const loader = async ({ request }: LoaderArgs) => {
  const {
    i18nextService,
    sessionService: { getSession, commitSession },
  } = serverServices;
  const locale = await i18nextService.getLocale(request);

  const session = await getSession(request);
  const toastMessage = getToastMessage(session);
  const csrf = createAuthenticityToken(session);

  const ENV = getClientEnvVars();

  return json(
    {
      ENV,
      locale,
      csrf,
      toastMessage,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export const handle = {
  i18n: ['common', 'navigation'] satisfies Namespace,
};

export const meta: V2_MetaFunction = () => [
  {
    charset: 'utf-8',
  },
  {
    title: 'Marble',
  },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
];

export default function App() {
  const { locale, ENV, toastMessage, csrf } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation(handle.i18n);

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="selection:text-grey-00 h-screen w-full overflow-hidden antialiased selection:bg-purple-100">
        <AuthenticityTokenProvider token={csrf}>
          <Tooltip.Provider>
            <Outlet />
          </Tooltip.Provider>
        </AuthenticityTokenProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <MarbleToaster toastMessage={toastMessage} />
      </body>
    </html>
  );
}