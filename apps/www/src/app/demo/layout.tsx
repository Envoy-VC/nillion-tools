import React, { type PropsWithChildren } from 'react';

import { KeyChainProvider } from '~/providers';

const DemoLayout = ({ children }: PropsWithChildren) => {
  return <KeyChainProvider>{children}</KeyChainProvider>;
};

export default DemoLayout;
