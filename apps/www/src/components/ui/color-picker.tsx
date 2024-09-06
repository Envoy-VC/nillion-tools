'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { useForwardedRef } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import type { ButtonProps } from './button';
import { Button } from './button';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    return (
      <div className='flex flex-row'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
            <Button
              {...props}
              className={cn('block', className)}
              name={name}
              size='icon'
              variant='outline'
              style={{
                backgroundColor: parsedValue,
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <div />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full'>
            <HexColorPicker color={parsedValue} onChange={onChange} />
            <Input
              ref={ref}
              maxLength={7}
              value={parsedValue}
              onChange={(e) => {
                onChange(e.currentTarget.value);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
