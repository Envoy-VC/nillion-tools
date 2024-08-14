import * as server from '@simplewebauthn/server';
import type * as Types from '../../types/webauthn';

export const generateRegistrationOptions = async (
  props: server.GenerateRegistrationOptionsOpts
) => {
  const firstSalt = new Uint8Array(new Array(32).fill(1)).buffer;
  const opts: server.GenerateRegistrationOptionsOpts = {
    ...props,
    // @ts-expect-error prf is canary feature
    extensions: { prf: { eval: { first: firstSalt } } },
  };
  return (await server.generateRegistrationOptions(
    opts
  )) as Types.PublicKeyCredentialCreationOptionsJSONWithPRF;
};

export const generateAuthenticationOptions = async (
  props: server.GenerateAuthenticationOptionsOpts
) => {
  const firstSalt = new Uint8Array(new Array(32).fill(1)).buffer;
  const opts: server.GenerateAuthenticationOptionsOpts = {
    ...props,
    // @ts-expect-error prf is canary feature
    extensions: { prf: { eval: { first: firstSalt } } },
  };
  return (await server.generateAuthenticationOptions(
    opts
  )) as Types.PublicKeyCredentialRequestOptionsJSONWitPRF;
};
