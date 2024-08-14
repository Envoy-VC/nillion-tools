import { loader } from 'fumadocs-core/source';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';

import { create } from '~/components/fumadocs';

import { map } from '../../.map';

import { icons } from 'lucide-react';

const frontmatter = defaultSchemas.frontmatter.extend({
  preview: z.string().optional(),
  index: z.boolean().default(false),
});

export const docsSource = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, {
    schema: {
      frontmatter,
    },
  }),
});

export const demoSource = loader({
  baseUrl: '/demo',
  rootDir: 'demo',
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, {
    schema: {
      frontmatter,
    },
  }),
});
