import Link from 'next/link';

import { cn } from '~/lib/utils';

import { buttonVariants } from './ui/button';

export const Hero = () => {
  return (
    <div className='container relative z-[2] flex h-[60dvh] flex-col items-center overflow-hidden border-x border-t bg-fd-background px-6 pt-12 text-center md:pt-32'>
      <h1 className='mb-6 text-4xl font-semibold md:text-5xl'>
        Build Apps on Nillion.
      </h1>
      <p className='mb-6 h-fit p-2 text-fd-muted-foreground md:max-w-[80%] md:text-xl'>
        Nillion Tools is a developer-centric toolkit that simplifies building on
        the Nillion network.{' '}
        <b className='font-medium text-fd-foreground'>
          Seamless integration with Next.js, React, Vite, and more. 🚀
        </b>
      </p>
      <div className='inline-flex items-center gap-3'>
        <Link
          href='/docs'
          className={cn(
            buttonVariants({ size: 'lg', className: 'rounded-full' })
          )}
        >
          Getting Started
        </Link>
        <Link
          href='/demo'
          className={cn(
            buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: 'rounded-full bg-fd-background',
            })
          )}
        >
          Open Demo
        </Link>
      </div>
      <div
        className='absolute inset-0 z-[-1]'
        style={{
          backgroundImage: [
            'radial-gradient(ellipse at top, transparent 60%, hsl(var(--primary) / 0.2))',
            'linear-gradient(to bottom, transparent 30%, hsl(var(--primary) / 0.2))',
            'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)',
            'repeating-linear-gradient(45deg, transparent,transparent 60px, hsl(var(--primary)) 61px, transparent 62px)',
          ].join(', '),
        }}
      />
    </div>
  );
};
