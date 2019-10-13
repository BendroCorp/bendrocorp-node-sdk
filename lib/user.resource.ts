import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { BendroConfiguration } from "./configuration";
import { Observable, Observer } from "rxjs";
import { DiscordIdentity } from "./models/user.model";
import { ApiClient } from "./api-client";
import { HttpClientError } from "./models/http-model";
import { StatusMessage } from "./models/misc.model";

export class UserResource extends BaseResource
{
  userConfig: BendroConfiguration;

  constructor(public params: { auth: AuthClient, useProduction?: boolean })
  {
    super(params);

    const credCheck = params.auth.getCredentials();
    if (credCheck.access_token == null && credCheck.refresh_token == null) {
      throw 'Both passed tokens cannot be null!'
    }

    this.userConfig = (this.useProduction) ? new BendroConfiguration({ service: 'main' }) : new BendroConfiguration({ service: 'local' })
  }

  discord_identity(params: { code?: string, discord_identity_id?: string, type: 'join'|'complete' }): Observable<DiscordIdentity|StatusMessage> {
    const apiClient = new ApiClient({ config: this.userConfig, auth: this.authClient })
    
    if (params.type === 'join') {
      if (params.code) {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const code = params.code
            const results = await apiClient.post<DiscordIdentity>(`/user/discord-identity`, { code }) as DiscordIdentity;
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        });
      } else {
        throw 'To use type \'join\' on discord_identity you must provide a code!'
      }
    } else if (params.type === 'complete') {
      if (params.discord_identity_id) {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const discord_identity_id = params.discord_identity_id;
            const results = await apiClient.put<StatusMessage>(`/user/discord-identity/${params.discord_identity_id}`, { }) as StatusMessage;
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        });
      } else {
        throw 'To use type \'complete\' on discord_identity you must provide a discord_identity_id!'
      }
    }
  }
}