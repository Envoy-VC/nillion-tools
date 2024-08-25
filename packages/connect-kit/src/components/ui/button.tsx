import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'ck-inline-flex ck-items-center ck-justify-center ck-whitespace-nowrap ck-rounded-md ck-text-sm ck-font-medium ck-ring-offset-background ck-transition-colors focus-visible:ck-outline-none focus-visible:ck-ring-2 focus-visible:ck-ring-ring focus-visible:ck-ring-offset-2 disabled:ck-pointer-events-none disabled:ck-opacity-50',
  {
    variants: {
      variant: {
        default:
          'ck-bg-primary ck-text-primary-foreground hover:ck-bg-primary/90',
        secondary:
          'ck-bg-secondary ck-text-secondary-foreground hover:ck-bg-secondary-hover',
        link: 'ck-text-primary ck-underline-offset-4 hover:ck-underline',
      },
      size: {
        default: 'ck-h-10 ck-px-4 ck-py-2',
        sm: 'ck-h-9 ck-rounded-md ck-px-3',
        lg: 'ck-h-11 ck-rounded-md ck-px-8',
        icon: 'ck-h-10 ck-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
