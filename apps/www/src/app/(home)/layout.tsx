import type { ReactNode } from 'react';

import { baseOptions } from '~/lib/fumadocs';

import { HomeLayout } from 'fumadocs-ui/home-layout';

import { Footer } from '~/components/fumadocs';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Footer />
    </HomeLayout>
  );
};

export default Layout;
