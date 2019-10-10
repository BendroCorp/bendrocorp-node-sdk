import { AuthClient } from "./auth-client";
import { ApiClient } from './api-client';

export class BaseResource {
  authClient: AuthClient;
  apiClient: ApiClient;
  useProduction: boolean;
  constructor(public params: { auth?: AuthClient, useProduction?: boolean }) {
    this.authClient = params.auth;
    // this.useProduction = (this.useProduction) ? true : false;
    if (this.useProduction == null || this.useProduction == true) {
      this.useProduction = true;
    } else {
      this.useProduction = false;
    }
  }
}