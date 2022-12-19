import type defaultNS from './i18n-config';

import type common from '../../../public/locales/en/common.json';
import type navigation from '../../../public/locales/en/navigation.json';
import type lists from '../../../public/locales/en/lists.json';
import type scenarios from '../../../public/locales/en/scenarios.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      common: typeof common;
      navigation: typeof navigation;
      lists: typeof lists;
      scenarios: typeof scenarios;
    };
  }
}