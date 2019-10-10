import { ApiClient } from "./api-client";
import { BendroConfiguration } from "./configuration";
import { IdTokenResponse } from "./models/user.model";
import { HttpClientError } from "./models/http-model";
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment';

export class AuthClient {
  private access_token: string;
  private id_token: string;
  private refresh_token: string;
  private credentialsSet: boolean = false;
  private doAutoRefresh: boolean = true;
  private useProduction: boolean;

  constructor(params?: { auto_refresh?: boolean, useProduction?: boolean; }) {
    if (params && params.auto_refresh != null) {
      this.doAutoRefresh = params.auto_refresh;

      if (params.useProduction == null || params.useProduction == true) {
        this.useProduction = true;
      } else {
        this.useProduction = false;
      }
    }
  }

  async auth(params: { email: string, password: string, code?: number, device: string, offline_access?: boolean} ): Promise<any> {
    const apiClient = new ApiClient({ config: new BendroConfiguration({ service: 'main', skipAppendApi: true }) })
    let result = await apiClient.post<IdTokenResponse>('/auth', 
    { 
      session: {
        email: params.email,
        password: params.password,
        code: params.code,
        device: params.device,
        offline_access: params.offline_access,
        grant_type: 'password'
      } 
    });

    if (!(result instanceof HttpClientError) && result instanceof IdTokenResponse) {
      this.setCredentials({ access_token: result.access_token, refresh_token: result.refresh_token, id_token: result.id_token })
      this.credentialsSet = true;
    }
  }

  async refreshCredential() {
    if (this.refresh_token && this.accessIsExpired() && this.doAutoRefresh) {
      const apiClient = new ApiClient({ config: new BendroConfiguration({service: 'main'}) })
      let result = await apiClient.post<IdTokenResponse>('/auth', 
      { 
        session: {
          refresh_token: this.refresh_token,
          grant_type: 'refresh_token'
        } 
      });

      if (!(result instanceof HttpClientError) && result instanceof IdTokenResponse) {
        this.setCredentials({ access_token: result.access_token, refresh_token: result.refresh_token, id_token: result.id_token })
      }
    } else {
      console.warn('Could not auto refresh.')
    }
  }

  async getAuthHeader(): Promise<string> {
    await this.refreshCredential();
    return `Bearer ${this.access_token}`
  }

  private accessIsExpired(): boolean {
    if (this.access_token) {
      // const jwtHelper = new JwtHelperService();      
      const decodedToken = jwt.decode(this.access_token);
      const payloadExp = decodedToken['payload'].exp;
      if (payloadExp) {
        return moment().isAfter(moment.unix(payloadExp));
      } else {
        return false; // if there is no exp then...there is no expiration 😀
      }
    } else {
      return true; // no access token definitely means that we can't do anything...
    }
  }

  /**
   * Retrieve the credential set
   */
  getCredentials(): { access_token?: string, refresh_token?: string, id_token?: string } {
    return { access_token: this.access_token, refresh_token: this.refresh_token, id_token: this.id_token }
  }

  setCredentials(params: { access_token?: string, refresh_token?: string, id_token?: string }) {
    if (params.access_token) {
      this.access_token = params.access_token;
    }

    if (params.refresh_token) {
      this.refresh_token = params.refresh_token;
    }    

    if (params.id_token) {
      this.id_token = params.id_token;
    }    
  }
}