import { Button } from '../ui/button';

import { useConnectWallet } from '~/lib/hooks';

export const ConnectButtonTrigger = () => {
  const { signInButton } = useConnectWallet();
  return (
    <Button className={signInButton.className} style={signInButton.style}>
      {signInButton.label}
    </Button>
  );
};
