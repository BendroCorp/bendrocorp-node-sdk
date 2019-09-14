import { AuthClient } from "./auth-client";
import { ApiClient } from './api-client';

export class BaseResource {
  authClient: AuthClient;
  apiClient: ApiClient;
  constructor(public params: { auth?: AuthClient }) {
    this.authClient = params.auth;
  }
}