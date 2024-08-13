import React from 'react';

import { StarsIcon } from 'lucide-react';

const Home = () => {
  return (
    <>
      <div
        className='absolute inset-x-0 top-[200px] h-[250px] max-md:hidden'
        style={{
          background:
            'repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
        }}
      />

      <main className='container relative max-w-[1100px] px-2 py-4 lg:py-16'>
        <div
          style={{
            background:
              'repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)',
          }}
        >
          <div className='relative'>
            <StarsIcon
              className='absolute -left-2 -top-2 z-10 size-4 xl:scale-[200%]'
              fill='currentColor'
              stroke='none'
            />
            <StarsIcon
              className='absolute -bottom-2 -right-2 z-10 size-4 xl:scale-[200%]'
              fill='currentColor'
              stroke='none'
            />
            {/* <Hero />
            <UwuHero /> */}
          </div>
          <div className='container border-x border-t py-24'>
            <h2 className='text-center text-2xl font-semibold sm:text-3xl'>
              Start instantly.
              <br />
              Make it yours, Ship within seconds.
            </h2>
          </div>
          {/* <Introduction /> */}
          <div
            className='container relative overflow-hidden border-x border-t py-16 sm:py-24'
            style={{
              backgroundImage:
                'radial-gradient(circle at bottom center, hsl(var(--secondary)), hsl(var(--background)))',
            }}
          >
            <h2 className='bg-gradient-to-b from-fd-primary to-fd-foreground/40 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl'>
              Loved by users.
              <br />
              Built for developers.
            </h2>

            <div
              className='mx-auto mb-[-160px] mt-8 flex h-[240px] flex-row overflow-hidden rounded-xl border bg-fd-card/50 backdrop-blur-lg md:w-[70%]'
              style={{
                maskImage: 'linear-gradient(to bottom, white, transparent)',
              }}
            >
              <div className='flex w-1/4 flex-col gap-4 border-r bg-fd-card p-4'>
                <div className='h-4 w-full rounded-full bg-fd-muted-foreground/20' />
                <div className='h-4 w-1/2 rounded-full bg-fd-muted-foreground/20' />
                <div className='h-4 w-1/2 rounded-full bg-fd-muted-foreground/20' />
              </div>
              <div className='flex flex-1 flex-col gap-4 px-4 py-8'>
                <div className='mb-3 h-6 w-1/4 rounded-full bg-fd-muted-foreground/20' />
                <div className='h-4 w-1/3 rounded-full bg-fd-muted-foreground/20' />
                <div className='h-4 w-full rounded-full bg-fd-muted-foreground/20' />
                <div className='h-4 w-1/2 rounded-full bg-fd-muted-foreground/20' />
              </div>
              <div className='w-1/4 pt-8 max-lg:hidden'>
                <div className='h-4 w-1/2 rounded-full bg-fd-muted-foreground/20' />
              </div>
            </div>
          </div>
          {/* <Highlights />
          <Features />
          <Contributing />
          <End /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
