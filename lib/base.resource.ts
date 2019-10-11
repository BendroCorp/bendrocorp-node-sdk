import { AuthClient } from "./auth-client";
import { ApiClient } from './api-client';

export class BaseResource {
  authClient: AuthClient;
  apiClient: ApiClient;
  readonly useProduction: boolean;
  constructor(public params: { auth?: AuthClient, useProduction?: boolean }) {
    this.authClient = params.auth;
    if (params.useProduction == null) {
      this.useProduction = true;
    } else {
      this.useProduction = params.useProduction;
    }
  }
}