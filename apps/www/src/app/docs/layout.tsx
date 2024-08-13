import type { PropsWithChildren } from 'react';

import { docsOptions } from '~/lib/fumadocs';

import { DocsLayout } from 'fumadocs-ui/layout';

const RootDocsLayout = ({ children }: PropsWithChildren) => {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
};

export default RootDocsLayout;
