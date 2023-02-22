/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MM_BACKEND_URL: string;
  readonly VITE_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
