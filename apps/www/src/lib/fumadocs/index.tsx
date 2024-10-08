import Image from 'next/image';

import React from 'react';

import type { HomeLayoutProps } from 'fumadocs-ui/home-layout';
import { type DocsLayoutProps } from 'fumadocs-ui/layout';
import NPMIcon from 'public/npm-icon.svg';
import { demoSource, docsSource } from '~/app/source';

import { Banner, NavChildren } from '~/components/fumadocs';

import { LibraryIcon } from 'lucide-react';

export const baseOptions: HomeLayoutProps = {
  githubUrl: 'https://github.com/Envoy-vc/nillion-tools',
  nav: {
    title: (
      <>
        <LibraryIcon className='size-5' strokeWidth={2.5} />
        <span className='hidden font-medium sm:block'>Nillion Tools</span>
      </>
    ),
    transparentMode: 'top',
    children: <NavChildren />,
  },
  links: [
    {
      icon: (
        <Image
          alt='NPM Icon'
          className='size-5 cursor-pointer rounded-sm'
          height={20}
          src={NPMIcon as unknown as string}
          width={20}
        />
      ),
      text: 'NPM Package',
      url: 'https://www.npmjs.com/org/nillion-tools',
      active: 'nested-url',
    },
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: docsSource.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: 'none',
    children: undefined,
  },
  sidebar: {
    banner: <Banner />,
  },
};

export const demoOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: demoSource.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: 'none',
    children: undefined,
  },
  sidebar: {
    banner: <Banner basePath='demo' />,
  },
};
