import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '~/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'ck-fixed ck-inset-0 ck-z-50 ck-bg-overlay ck- data-[state=open]:ck-animate-in data-[state=closed]:ck-animate-out data-[state=closed]:ck-fade-out-0 data-[state=open]:ck-fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
  }
>(({ className, children, showCloseButton = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'ck-fixed ck-left-[50%] ck-top-[50%] ck-z-50 ck-grid ck-translate-x-[-50%] ck-translate-y-[-50%] ck-gap-4 ck-border ck-bg-background ck-p-6 ck-shadow-lg ck-duration-200 data-[state=open]:ck-animate-in data-[state=closed]:ck-animate-out data-[state=closed]:ck-fade-out-0 data-[state=open]:ck-fade-in-0 data-[state=closed]:ck-zoom-out-95 data-[state=open]:ck-zoom-in-95 data-[state=closed]:ck-slide-out-to-left-1/2 data-[state=closed]:ck-slide-out-to-top-[48%] data-[state=open]:ck-slide-in-from-left-1/2 data-[state=open]:ck-slide-in-from-top-[48%] sm:ck-rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close className='ck-absolute ck-right-4 ck-top-4 ck-rounded-sm ck-opacity-70 ck-ring-offset-background ck-transition-opacity hover:ck-opacity-100 focus:ck-outline-none focus:ck-ring-2 focus:ck-ring-ring focus:ck-ring-offset-2 disabled:ck-pointer-events-none data-[state=open]:ck-bg-accent data-[state=open]:ck-text-muted-foreground'>
          <X className='ck-h-4 ck-w-4' />
          <span className='ck-sr-only'>Close</span>
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ck-flex ck-flex-col ck-space-y-1.5 ck-text-center sm:ck-text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ck-flex ck-flex-col-reverse sm:ck-flex-row sm:ck-justify-end sm:ck-space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'ck-text-lg ck-font-semibold ck-leading-none ck-tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('ck-text-sm ck-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
