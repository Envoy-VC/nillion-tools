/* eslint-disable react/no-unknown-property -- tw is known prop */

/* eslint-disable @next/next/no-img-element -- og dynamic */
import type { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const fontData = await fetch(
      new URL('../../../../public/assets/GeistMono.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const background = await fetch(
      new URL('../../../../public/assets/og-background.png', import.meta.url)
    ).then((res) => res.arrayBuffer());

    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Nillion Tools';

    const hasDescription = searchParams.has('description');
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 256)
      : 'Nillion Tools is a developer-centric toolkit that simplifies building on the Nillion network. Seamless integration with Next.js, React, Vite, and more. 🚀';

    return new ImageResponse(
      (
        <div tw='w-full h-full relative flex flex-col justify-center items-center'>
          <img
            alt={title}
            src={background as unknown as string}
            tw='absolute h-full w-full'
          />
          <div tw='flex flex-col justify-center items-center'>
            <h1 tw='text-5xl font-bold text-white font-Geist mb-8'>{title}</h1>
            <p tw='text-xl font-semibold text-neutral-300 font-Geist mb-8 max-w-5xl text-center mx-auto'>
              {description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong!', { status: 500 });
  }
}
