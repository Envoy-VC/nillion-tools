/* eslint-disable -- safe */
import { useParams } from 'next/navigation';

export function useActiveProject(): string | undefined {
  // @ts-expect-error slug exists
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}
