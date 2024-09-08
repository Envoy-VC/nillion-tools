/* eslint-disable no-nested-ternary -- allow nested */
import {
  type ComponentProps,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import { cn, errorHandler, truncate } from '~/lib/utils';

import { Button, type ButtonProps } from './button';

import {
  CircleCheck,
  CopyIcon,
  Eye,
  EyeOff,
  type LucideProps,
} from 'lucide-react';

const TextCopyContext = createContext<{
  content?: string;
  type?: 'text' | 'password';
  truncateOptions?: {
    enabled?: boolean;
    length?: number;
    fromMiddle?: boolean;
  };
  hidden: boolean;
  setHidden: (value: boolean) => void;
}>({
  content: '',
  hidden: false,
  type: 'text',
  truncateOptions: {
    enabled: true,
    length: 20,
    fromMiddle: true,
  },
  setHidden: () => {
    return null;
  },
});

interface TextCopyProps extends ComponentProps<'div'> {
  content?: string;
  type?: 'text' | 'password';
  truncateOptions?: {
    enabled?: boolean;
    length?: number;
    fromMiddle?: boolean;
  };
}

type TextCopyContentProps = ComponentProps<'div'>;

interface TextCopyEyeProps extends ButtonProps {
  iconProps?: LucideProps;
}

interface TextCopyButtonProps extends ButtonProps {
  canCopy?: boolean;
  iconProps?: LucideProps;
}

export const TextCopy = forwardRef<HTMLDivElement, TextCopyProps>(
  ({ children, className, content, type, truncateOptions, ...props }, ref) => {
    const [hidden, setHidden] = useState<boolean>(false);
    return (
      <TextCopyContext.Provider
        value={{
          hidden,
          setHidden,
          content,
          type,
          truncateOptions,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'ck-flex ck-flex-row ck-items-center ck-gap-2',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TextCopyContext.Provider>
    );
  }
);

export const TextCopyContent = forwardRef<HTMLDivElement, TextCopyContentProps>(
  ({ className, ...props }, ref) => {
    const { hidden, type, truncateOptions, content } =
      useContext(TextCopyContext);
    return (
      <div className={cn('ck-font-medium', className)} {...props} ref={ref}>
        {type === 'text'
          ? truncateOptions?.enabled
            ? truncate(content ?? '', length, truncateOptions.fromMiddle)
            : content
          : hidden
            ? '*'.repeat(24)
            : truncateOptions?.enabled
              ? truncate(content ?? '', length, truncateOptions.fromMiddle)
              : content}
      </div>
    );
  }
);

export const TextCopyEye = forwardRef<HTMLButtonElement, TextCopyEyeProps>(
  ({ iconProps = { size: 16, strokeWidth: 2.5 }, ...props }, ref) => {
    const { hidden, setHidden } = useContext(TextCopyContext);
    return (
      <Button
        className='ck-h-8 ck-w-8 ck-p-0'
        variant='ghost'
        onClick={() => setHidden(!hidden)}
        {...props}
        ref={ref}
      >
        {hidden ? <EyeOff {...iconProps} /> : <Eye {...iconProps} />}
      </Button>
    );
  }
);

export const TextCopyButton = forwardRef<
  HTMLButtonElement,
  TextCopyButtonProps
>(({ iconProps = { strokeWidth: 2.5 }, canCopy = true, ...props }, ref) => {
  const { content } = useContext(TextCopyContext);
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (data: string) => {
    await navigator.clipboard.writeText(data);
  };

  const copyText = async () => {
    try {
      await copy(content ?? '');
      setCopied(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  return (
    <>
      {canCopy ? (
        <Button
          className='ck-h-8 ck-w-8 !ck-p-0'
          variant='secondary'
          onClick={copyText}
          {...props}
          ref={ref}
        >
          {copied ? (
            <CircleCheck size={16} {...iconProps} />
          ) : (
            <CopyIcon size={16} {...iconProps} />
          )}
        </Button>
      ) : null}
    </>
  );
});

TextCopy.displayName = 'TextCopy';
TextCopyContent.displayName = 'TextCopyContent';
TextCopyEye.displayName = 'TextCopyEye';
TextCopyButton.displayName = 'TextCopyButton';
