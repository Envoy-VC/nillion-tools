import { type PropsWithChildren } from 'react';

import { demoOptions } from '~/lib/fumadocs';

import { DocsLayout } from 'fumadocs-ui/layout';

const RootDocsLayout = ({ children }: PropsWithChildren) => {
  return <DocsLayout {...demoOptions}>{children}</DocsLayout>;
};

export default RootDocsLayout;
