/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full URL of the admin app for footer link, e.g. https://admin.example.com */
  readonly VITE_ADMIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
