import type { AppEnvironment } from './environment';
import { readEnv } from './read-env';

export const environment: AppEnvironment = {
  production: false,
  name: readEnv('VITE_NAME', 'I&M Bank eKash'),
  url: readEnv('VITE_URL', 'http://localhost:3000/api'),
};
