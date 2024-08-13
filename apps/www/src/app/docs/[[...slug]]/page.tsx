import { notFound } from 'next/navigation';

import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { docsSource } from '~/app/source';

const Page = ({ params }: { params: { slug?: string[] } }) => {
  const { getPage } = docsSource;
  const page = getPage(params.slug);

  if (!page) {
    notFound();
  }

  const Mdx = page.data.exports.default;

  return (
    <DocsPage
      full={page.data.full}
      lastUpdate={page.data.exports.lastModified}
      toc={page.data.exports.toc}
    >
      <DocsBody>
        <h1 className='text-3xl font-bold text-fd-foreground sm:text-4xl'>
          {page.data.title}
        </h1>
        {page.data.description ? (
          <p className='mb-8 text-lg text-fd-muted-foreground'>
            {page.data.description}
          </p>
        ) : null}
        <Mdx />
      </DocsBody>
    </DocsPage>
  );
};

export function generateStaticParams() {
  const { getPages } = docsSource;

  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const { getPage } = docsSource;

  const page = getPage(params.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}

export default Page;
