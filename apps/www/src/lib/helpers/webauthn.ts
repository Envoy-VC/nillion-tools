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
import { env } from '~/env';

const { host, origin } =
  env.NEXT_PUBLIC_ENVIRONMENT === 'development'
    ? {
        host: 'localhost',
        origin: 'http://localhost:3000',
      }
    : {
        host: 'nillion-tools.envoy1084.xyz',
        origin: 'https://nillion-tools.envoy1084.xyz',
      };

export const register = async (
  userName: string,
  manager: WebAuthnManager,
  append?: (data: string) => void
) => {
  const exists = Boolean(await manager.dataSource.get(userName));

  if (exists) {
    throw new Error('User already exists');
  }

  const opts = await generateRegistrationOptions({
    rpName: 'Demo',
    rpID: host,
    userName,
  });

  if (append) {
    append(
      `✅ Generated Registration Options\n
User ID: ${opts.user.id}
Relying Party: ${opts.challenge}
Challenge: ${opts.challenge}\n`
    );
  }

  if (append) {
    append(`⏳ Creating Credential\n`);
  }

  const credential = await startRegistration(opts);

  if (append) {
    append(
      `✅ Created Credential\n
Credential ID: ${credential.id}
Type: ${credential.type}\n`
    );
  }

  if (append) {
    append(`⏳ Verifying Credential\n`);
  }

  const verifiedResponse = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge: opts.challenge,
    expectedOrigin: origin,
  });

  if (!verifiedResponse.verified) {
    if (append) {
      append(`❌ Credential Verification Error\n`);
    }
    throw new Error('Credential Verification Error');
  }

  if (append) {
    append(
      `✅ Verified Credential\n
Device Type: ${String(verifiedResponse.registrationInfo?.credentialDeviceType)}\n`
    );
  }

  const passkey = await manager.savePasskey(
    userName,
    opts,
    credential,
    verifiedResponse
  );

  if (append) {
    append(`✅ Passkey Saved Successfully\n`);
  }

  return {
    options: opts,
    credential,
    verifiedResponse,
    passkey,
  };
};

export const authenticate = async (
  userName: string,
  manager: WebAuthnManager,
  append?: (data: string) => void
) => {
  const passkey = await manager.getPasskey(userName);

  if (!passkey) {
    throw new Error('No passkey found');
  }

  const opts = await generateAuthenticationOptions({
    rpID: host,
    allowCredentials: [
      {
        id: passkey.credentialId,
        transports: passkey.transports,
      },
    ],
  });

  if (append) {
    append(
      `✅ Generated Authentication Options\n\nAllowed Credentials: ${(opts.allowCredentials ?? []).map((c) => c.id).join(', ')}\n\n`
    );
  }

  if (append) {
    append(`⏳ Authenticating Credential\n`);
  }

  const response = await startAuthentication(opts);
  const prf =
    response.clientExtensionResults.prf?.results.first ?? Buffer.from([]);
  const prfArr = Array.from(new Uint8Array(prf)).join(', ');

  if (append) {
    append(
      `✅ Created Authentication Response\n\nPseudo-Random Function(PRF): [${prfArr}]\n\n`
    );
  }

  if (append) {
    append(`⏳ Verifying Authentication Response\n`);
  }

  const verificationResponse = await verifyAuthenticationResponse({
    response,
    expectedChallenge: opts.challenge,
    expectedOrigin: origin,
    expectedRPID: host,
    authenticator: {
      credentialID: passkey.credentialId,
      credentialPublicKey: passkey.publicKey,
      counter: passkey.counter,
      transports: passkey.transports,
    },
  });

  if (append) {
    append(
      `✅ Verified Authentication Response\n\nDevice Type: ${String(verificationResponse.authenticationInfo.credentialDeviceType)}`
    );
  }

  return { response, verificationResponse };
};
