import type { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import type { DataSource } from '../../storage';
import type * as Types from '../../types/webauthn';

export class WebAuthnManager {
  public dataSource: DataSource<Types.Passkey>;

  constructor(store: DataSource<Types.Passkey>) {
    this.dataSource = store;
  }

  async savePasskey(
    id: string,
    registrationOpts: Types.PublicKeyCredentialCreationOptionsJSONWithPRF,
    registrationResponse: Types.RegistrationResponseJSONWitPRF,
    verificationResponse: VerifiedRegistrationResponse
  ) {
    const { registrationInfo: data } = verificationResponse;
    const newPasskey: Types.Passkey = {
      id,
      credentialId: data?.credentialID ?? '',
      webauthnUserID: registrationOpts.user.id,
      publicKey: data?.credentialPublicKey ?? new Uint8Array(),
      counter: data?.counter ?? 0,
      deviceType: data?.credentialDeviceType ?? 'singleDevice',
      backedUp: data?.credentialBackedUp ?? false,
      transports: registrationResponse.response.transports,
    };

    await this.dataSource.save(newPasskey.id, newPasskey, 'id');

    return newPasskey;
  }

  async getPasskey(id: string) {
    return await this.dataSource.get(id, 'id');
  }
}
