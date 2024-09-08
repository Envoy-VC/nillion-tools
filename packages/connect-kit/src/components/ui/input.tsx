import * as React from 'react';

import { cn } from '~/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'ck-flex ck-h-10 ck-w-full ck-rounded-md ck-border ck-border-input ck-bg-background ck-px-3 ck-py-2 ck-text-sm ck-ring-offset-background file:ck-border-0 file:ck-bg-transparent file:ck-text-sm file:ck-font-medium placeholder:ck-text-muted-foreground focus-visible:ck-outline-none focus-visible:ck-ring-0 focus-visible:ck-ring-ring focus-visible:ck-ring-offset-0 disabled:ck-cursor-not-allowed disabled:ck-opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
