import { type ComponentProps, useMemo } from 'react';
import { useConnectWallet } from '~/lib/hooks';
import { AnimateSlide } from './animate-slide';

export const TermsAndConditions = () => {
  const { modalOptions } = useConnectWallet();

  const separator = useMemo(() => {
    if (modalOptions.privacyPolicyUrl && modalOptions.termsOfServiceUrl) {
      return '&';
    }
    return '';
  }, [modalOptions.privacyPolicyUrl, modalOptions.termsOfServiceUrl]);

  if (
    Boolean(modalOptions.privacyPolicyUrl) ||
    Boolean(modalOptions.termsOfServiceUrl)
  )
    return (
      <AnimateSlide>
        <div className='ck-text-xs ck-text-neutral-400 ck-font-medium mx-auto text-center ck-border-t ck-pt-4'>
          By connecting, you agree to the <br />
          {modalOptions.termsOfServiceUrl ? (
            <Link
              href={modalOptions.termsOfServiceUrl}
              rel='noreferrer'
              target='_blank'
            >
              Terms of Service
            </Link>
          ) : null}{' '}
          {separator}{' '}
          {modalOptions.privacyPolicyUrl ? (
            <Link
              href={modalOptions.privacyPolicyUrl}
              rel='noreferrer'
              target='_blank'
            >
              Privacy Policy
            </Link>
          ) : null}{' '}
        </div>
      </AnimateSlide>
    );

  return null;
};

const Link = ({ href, children, ...props }: ComponentProps<'a'>) => {
  return (
    <a
      className='ck-text-link-foreground hover:ck-text-link-hover ck-transition-colors ck-ease-in-out ck-duration-300'
      href={href}
      rel='noreferrer'
      target='_blank'
      {...props}
    >
      {children}
    </a>
  );
};
