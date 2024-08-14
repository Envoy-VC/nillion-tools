import {
  type WebAuthnManager,
  startAuthentication,
  startRegistration,
} from '@nillion-tools/key-manager/webauthn/browser';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@nillion-tools/key-manager/webauthn/server';

export const register = async (userName: string, manager: WebAuthnManager) => {
  const exists = Boolean(await manager.dataSource.get(userName));

  if (exists) {
    throw new Error('User already exists');
  }

  const opts = await generateRegistrationOptions({
    rpName: 'Demo',
    rpID: 'localhost',
    userName,
  });

  console.log('Register Options:', opts);

  const credential = await startRegistration(opts);

  console.log('Credential:', credential);

  const verifiedResponse = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge: opts.challenge,
    expectedOrigin: 'http://localhost:3000',
  });

  console.log('Verified Response:', verifiedResponse);

  const passkey = await manager.savePasskey(
    userName,
    opts,
    credential,
    verifiedResponse
  );

  console.log('PassKey Saved', passkey);
};

export const authenticate = async (
  userName: string,
  manager: WebAuthnManager
) => {
  const opts = await generateAuthenticationOptions({
    rpID: 'localhost',
  });

  console.log('Authentication Options:', opts);

  const passkey = await manager.getPasskey(userName);

  if (!passkey) {
    throw new Error('No passkey found');
  }

  const response = await startAuthentication(opts);

  console.log('Authentication Response:', response);

  const verificationResponse = await verifyAuthenticationResponse({
    response,
    expectedChallenge: opts.challenge,
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
    authenticator: {
      credentialID: passkey.credentialId,
      credentialPublicKey: passkey.publicKey,
      counter: passkey.counter,
      transports: passkey.transports,
    },
  });

  console.log('Verification Response:', verificationResponse);

  return { response, verificationResponse };
};
