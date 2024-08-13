import type { ComponentLogger } from '@libp2p/interface';
import type { KeychainInit } from '@libp2p/keychain';
import type { Datastore } from 'interface-datastore';

export interface KeyChainProps extends KeychainInit {
  datastore: Datastore;
  logger?: ComponentLogger;
}
