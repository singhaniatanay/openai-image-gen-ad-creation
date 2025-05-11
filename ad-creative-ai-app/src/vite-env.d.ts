/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // You can add other environment variables here as your project grows
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}