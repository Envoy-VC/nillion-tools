import type { ConnectWalletProps } from '~/types';

export const buildConnectWalletProps = (
  props: Partial<ConnectWalletProps>
): ConnectWalletProps => {
  const newProps: ConnectWalletProps = {
    signInButton: {
      label: props.signInButton?.label ?? 'Connect Wallet',
      className: props.signInButton?.className ?? '',
      style: props.signInButton?.style ?? {},
    },
    switchButton: {
      label: props.switchButton?.label ?? 'Switch Chain',
      className: props.switchButton?.className ?? '',
      style: props.switchButton?.style ?? {},
    },
    modalOptions: {
      size: props.modalOptions?.size ?? 'compact',
      privacyPolicyUrl: props.modalOptions?.privacyPolicyUrl ?? '',
      termsOfServiceUrl: props.modalOptions?.termsOfServiceUrl ?? '',
      title: props.modalOptions?.title ?? 'Connect Wallet',
      titleIcon: props.modalOptions?.titleIcon,
      welcomeScreen: props.modalOptions?.welcomeScreen ?? (() => null),
    },
  };
  return newProps;
};
