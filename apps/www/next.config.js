import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { remarkInstall } from 'fumadocs-docgen';
import createMDX from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';

await import('./src/env.js');

const withMDX = createMDX({
  mdxOptions: {
    // @ts-ignore
    rehypeCodeOptions: {
      transformers: [
        // @ts-ignore
        ...rehypeCodeDefaultOptions.transformers,
        transformerTwoslash(),
      ],
    },
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
  async rewrites() {
    return [
      {
        destination: 'https://nillion-tools.envoy1084.me/:path*',
        source: '/api-docs/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default withMDX(config);
