import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(['development', 'production']),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
  emptyStringAsUndefined: true,
});
