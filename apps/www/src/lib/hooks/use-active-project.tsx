/* eslint-disable -- safe */
// @ts-nocheck
import { useParams } from 'next/navigation';

export function useActiveProject(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}
