import type { ConnectWalletProps, DeepPartial } from '~/types';

export const buildConnectWalletProps = (
  props: DeepPartial<ConnectWalletProps>
): ConnectWalletProps => {
  const newProps: ConnectWalletProps = {
    mode: props.mode ?? 'modal',
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
