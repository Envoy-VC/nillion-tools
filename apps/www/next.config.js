import { remarkInstall } from 'fumadocs-docgen';
import createMDX from 'fumadocs-mdx/config';

await import('./src/env.js');

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [
      [
        remarkInstall,
        {
          persist: {
            id: 'package-manager',
          },
        },
      ],
    ],
    lastModifiedTime: 'git',
  },
});

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default withMDX(config);
