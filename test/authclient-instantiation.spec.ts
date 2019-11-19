import { expect } from 'chai';
import { AuthClient } from '../lib/auth-client';
import 'mocha';

describe('AuthClient ', () => {

  let authClient = new AuthClient();
  
  it('should not be null', () => {
    expect(authClient).not.equal(null);
  });

  it('token should be set', () => {
    authClient.setCredentials({ access_token: 'not_a_valid_token' })
    expect(authClient.getCredentials().access_token).not.equal('');
  });

});