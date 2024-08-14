import React from 'react';

import { Hero } from '~/components';

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

      <main className='container relative max-w-[1100px] px-2 py-4 lg:py-24'>
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
            <Hero />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
