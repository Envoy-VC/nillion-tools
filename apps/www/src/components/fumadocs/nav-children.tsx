import Link from 'next/link';

import { modes } from '~/lib/fumadocs/modes';

export const NavChildren = () => {
  return (
    <div className='flex flex-row rounded-md border bg-fd-muted/80 p-1 text-sm text-fd-muted-foreground max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2'>
      {modes.map((m) => (
        <Link
          key={m.param}
          className='rounded-md px-2 py-1 transition-colors hover:text-fd-accent-foreground'
          href={m.href}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
};
