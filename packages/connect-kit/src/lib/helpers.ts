import type { ConnectWalletProps, PartialConnectWalletProps } from '~/types';
import { nillionTestnet } from './chain';

export const buildConnectWalletProps = (
  props: PartialConnectWalletProps
): ConnectWalletProps => {
  const newProps: ConnectWalletProps = {
    chainOptions: {
      chains: props.chainOptions?.chains ?? [nillionTestnet.chainId],
      defaultChain: props.chainOptions?.defaultChain ?? nillionTestnet.chainId,
      chainInfos: props.chainOptions?.chainInfos ?? [nillionTestnet],
    },
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
      welcomeScreen: props.modalOptions?.welcomeScreen ?? (() => null),
    },
  };
  return newProps;
};
