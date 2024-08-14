import { useParams } from 'next/navigation';

export function useActiveProject(): string | undefined {
  const params = useParams<{ slug: string | string[] }>();
  if (params?.slug) {
    return Array.isArray(params.slug) && params.slug.length > 0
      ? params.slug[0]
      : undefined;
  }

  return undefined;
}
