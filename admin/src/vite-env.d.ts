/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public marketing site URL (no trailing slash), e.g. https://www.example.com */
  readonly VITE_PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
