import type { PropsWithChildren } from 'react';

import { demoOptions } from '~/lib/fumadocs';

import { DocsLayout } from 'fumadocs-ui/layout';
import { KeyChainProvider } from '~/providers';

const RootDocsLayout = ({ children }: PropsWithChildren) => {
  return (
    <KeyChainProvider>
      <DocsLayout {...demoOptions}>{children}</DocsLayout>
    </KeyChainProvider>
  );
};

export default RootDocsLayout;
