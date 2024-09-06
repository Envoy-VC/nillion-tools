import React, { useState } from 'react';

import type { ConnectWalletProps } from '@nillion-tools/connect-kit';
import rgbHex from 'rgb-hex';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

import { ColorPicker } from '../ui/color-picker';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

import {
  PaletteIcon,
  RectangleHorizontalIcon,
  Settings2Icon,
} from 'lucide-react';

const variableNames = [
  '--ck-background',
  '--ck-foreground',
  '--ck-primary',
  '--ck-primary-foreground',
  '--ck-secondary',
  '--ck-secondary-hover',
  '--ck-secondary-foreground',
  '--ck-muted-foreground',
  '--ck-overlay',
  '--ck-link-foreground',
  '--ck-link-hover',
  '--ck-accent',
];

interface ConnectKitOptsProps {
  opts: ConnectWalletProps;
  setOpts: (props: ConnectWalletProps) => void;
}

export const ConnectKitOptions = ({ opts, setOpts }: ConnectKitOptsProps) => {
  return (
    <div className=''>
      <Accordion className='!my-0 !flex !flex-col !py-0' type='multiple'>
        <AccordionItem className='border-none' value='modal-options'>
          <AccordionTrigger className='!my-0 h-12 !rounded-[2rem] border border-neutral-200 bg-secondary px-4 text-lg font-medium text-neutral-600 !no-underline hover:bg-secondary/80 dark:border-neutral-700 dark:text-gray-400'>
            <div className='flex flex-row items-center justify-start gap-2'>
              <Settings2Icon />
              Modal Options
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4 px-3'>
            <div className='flex flex-col gap-2'>
              <div className='text-base font-medium'>Modal Size</div>
              <RadioGroup
                className='flex flex-row items-center gap-2'
                defaultValue='compact'
                onValueChange={(value) => {
                  setOpts({
                    ...opts,
                    modalOptions: {
                      ...opts.modalOptions,
                      size: value as 'compact' | 'wide',
                    },
                  });
                }}
              >
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem id='size-compact' value='compact' />
                  <Label htmlFor='size-compact'>Compact</Label>
                </div>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem id='size-wide' value='wide' />
                  <Label htmlFor='size-wide'>Wide</Label>
                </div>
              </RadioGroup>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-base font-medium'>Modal Title</div>
              <Input
                autoComplete='off'
                autoCorrect='off'
                className='h-12 rounded-2xl outline-none'
                placeholder='Connect Wallet'
                onChange={(e) => {
                  const newTitle =
                    e.target.value === '' ? undefined : e.target.value;

                  setOpts({
                    ...opts,
                    modalOptions: {
                      ...opts.modalOptions,
                      title: newTitle,
                    },
                  });
                }}
              />
            </div>
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='text-base font-medium'>Privacy Policy</div>
                <Input
                  autoComplete='off'
                  autoCorrect='off'
                  className='h-12 rounded-2xl outline-none'
                  placeholder='https://example.com/privacy'
                  onChange={(e) => {
                    const newData =
                      e.target.value === '' ? undefined : e.target.value;

                    setOpts({
                      ...opts,
                      modalOptions: {
                        ...opts.modalOptions,
                        privacyPolicyUrl: newData,
                      },
                    });
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <div className='text-base font-medium'>
                  Terms and Conditions
                </div>
                <Input
                  autoComplete='off'
                  autoCorrect='off'
                  className='h-12 rounded-2xl outline-none'
                  placeholder='https://example.com/terms'
                  onChange={(e) => {
                    const newData =
                      e.target.value === '' ? undefined : e.target.value;

                    setOpts({
                      ...opts,
                      modalOptions: {
                        ...opts.modalOptions,
                        termsOfServiceUrl: newData,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='border-none' value='appearance'>
          <AccordionTrigger className='h-12 !rounded-[2rem] border border-neutral-200 bg-secondary px-4 text-lg font-medium text-neutral-600 !no-underline hover:bg-secondary/80 dark:border-neutral-700 dark:text-gray-400'>
            <div className='flex h-12 flex-row items-center justify-start gap-2'>
              <PaletteIcon />
              Appearance Options
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4 px-3'>
            <ScrollArea className='h-[300px]'>
              <div className='flex flex-col gap-4'>
                {variableNames.map((name) => {
                  const prettyName = name
                    .slice(5)
                    .split('-')
                    .map(
                      (value) =>
                        `${value.charAt(0).toUpperCase()}${value.slice(1)}`
                    )
                    .join(' ');

                  return (
                    <ColorPickerWithInput
                      key={name}
                      name={name}
                      prettyName={prettyName}
                      value={`var(${name})`}
                      onChange={(color) => {
                        document.documentElement.style.setProperty(name, color);
                      }}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='border-none' value='button-options'>
          <AccordionTrigger className='h-12 !rounded-[2rem] border border-neutral-200 bg-secondary px-4 text-lg font-medium text-neutral-600 !no-underline hover:bg-secondary/80 dark:border-neutral-700 dark:text-gray-400'>
            <div className='flex h-12 flex-row items-center justify-start gap-2'>
              <RectangleHorizontalIcon />
              Button Options
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-3'>
            <div className='flex flex-col gap-2'>
              <div className='text-base font-medium'>Button Label</div>
              <Input
                autoComplete='off'
                autoCorrect='off'
                className='h-12 rounded-2xl outline-none'
                placeholder='Connect Wallet'
                onChange={(e) => {
                  const newTitle =
                    e.target.value === '' ? undefined : e.target.value;

                  setOpts({
                    ...opts,
                    signInButton: {
                      ...opts.signInButton,
                      label: newTitle,
                    },
                  });
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

interface ColorPickerWithInputOpts {
  name: string;
  prettyName: string;
  value: string;
  onChange: (value: string) => void;
}

const getHexColor = (color: string) => {
  if (color.startsWith('#')) {
    return color;
  } else if (color.startsWith('rgb')) {
    return `#${rgbHex(color)}`;
  }
  return color;
};

const ColorPickerWithInput = ({
  name,
  onChange,
  prettyName,
}: ColorPickerWithInputOpts) => {
  const varColor = getHexColor(
    getComputedStyle(document.documentElement).getPropertyValue(name)
  );
  const [color, setColor] = useState<string>(varColor);
  return (
    <div className='flex h-14 flex-row items-start gap-4 border-b pb-[6px]'>
      <div className='aspect-square h-12 rounded-xl'>
        <ColorPicker
          className='h-12 w-12'
          value={color}
          onChange={(value) => {
            onChange(value);
            setColor(value);
          }}
        />
      </div>
      <div className='flex flex-col'>
        <div className='text-lg font-medium'>{prettyName}</div>
        <Input
          autoComplete='off'
          autoCorrect='off'
          className='h-3 border-none px-0 text-xs outline-none'
          value={color}
          onChange={(e) => {
            onChange(e.target.value);
            setColor(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
