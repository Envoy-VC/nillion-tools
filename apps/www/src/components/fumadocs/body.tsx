'use client';

import type { PropsWithChildren } from 'react';

import { useActiveProject } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { GeistSans } from 'geist/font/sans';

export const Body = ({ children }: PropsWithChildren): React.ReactElement => {
  const activeProject = useActiveProject();

  return (
    <body
      className={cn(
        activeProject,
        'flex min-h-screen flex-col font-sans',
        GeistSans.variable
      )}
    >
      {children}
    </body>
  );
};
