/* eslint-disable import/no-relative-packages -- safe */
import keyManager from '../../../../../packages/nillion-key-manager/package.json';

import { KeyIcon, type LucideIcon, WalletIcon } from 'lucide-react';

export interface Project {
  param: string;
  name: string;
  package: string;
  description: {
    small: string;
    large: string;
  };
  version: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    param: 'key-manager',
    name: 'Key Manager',
    package: 'key-manager',
    description: {
      small: 'Manage Ed25519 Keys',
      large: 'Manage and Authenticate Ed25519 Keys',
    },
    version: keyManager.version,
    icon: KeyIcon,
  },
  {
    param: 'connect-kit',
    name: 'Connect Kit',
    package: 'connect-kit',
    description: {
      small: 'Connect to Nillion',
      large: 'Connect to Nillion with Connect Kit',
    },
    version: keyManager.version,
    icon: WalletIcon,
  },
];
