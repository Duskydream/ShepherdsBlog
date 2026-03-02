/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMeta {
  env: {
    PROD: boolean;
    DEV: boolean;
    OPENAI_API_KEY?: string;
    SCHEDULE_AI_BASE_URL?: string;
    SCHEDULE_AI_MODEL?: string;
  };
}

declare module "dayjs" {
  interface Dayjs {
    format: (template?: string) => string;
    locale: {
      (): string;
      (preset: string, object?: Partial<ILocale>): Dayjs;
    };
  }

  interface ILocale {
    name: string;
    weekdays?: string[];
    months?: string[];
    [key: string]: any;
  }

  export default function dayjs(date?: any): Dayjs;
  namespace dayjs {
    export const locale: (preset: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean) => string;
  }
}

declare module "dayjs/locale/*" {
  const locale: any;
  export default locale;
}
