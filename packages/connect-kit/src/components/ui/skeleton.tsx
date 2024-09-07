import { cn } from '~/lib/utils';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('ck-animate-pulse ck-rounded-md ck-bg-muted', className)}
      {...props}
    />
  );
};

export { Skeleton };
