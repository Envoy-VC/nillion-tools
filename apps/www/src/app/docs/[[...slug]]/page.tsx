import { notFound } from 'next/navigation';

import { createMetadata } from '~/lib/metadata';

import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { docsSource } from '~/app/source';

interface Param {
  slug: string[];
}

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

export function generateMetadata({ params }: { params: Param }): Metadata {
  const page = docsSource.getPage(params.slug);

  if (!page) notFound();

  const description =
    page.data.description ?? 'The library for building documentation sites';

  const image = {
    alt: 'Banner',
    url: `/og/docs/${page.slugs.join('/')}.png`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}

export default Page;
