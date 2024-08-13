import { createSearchAPI } from 'fumadocs-core/search/server';
import { docsSource } from '~/app/source';

export const { GET } = createSearchAPI('advanced', {
  indexes: docsSource.getPages().map((page) => ({
    title: page.data.title,
    structuredData: page.data.exports.structuredData,
    id: page.url,
    url: page.url,
  })),
});
