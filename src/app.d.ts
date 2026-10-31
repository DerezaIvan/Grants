import '@sveltejs/kit';

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL?: string;
}

declare global {
  namespace App {}
}

export {};
