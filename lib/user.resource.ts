import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { BendroConfiguration } from "./configuration";
import { Observable, Observer } from "rxjs";
import { DiscordIdentity } from "./models/user.model";
import { ApiClient } from "./api-client";
import { HttpClientError } from "./models/http-model";
import { StatusMessage } from "./models/misc.model";

export class user extends BaseResource
{
  reportConfig: any;

  constructor(public params: { auth: AuthClient, useProduction?: boolean })
  {
    super(params);

    this.reportConfig = (this.useProduction) ? new BendroConfiguration({ service: 'main' }) : new BendroConfiguration({ service: 'local' })
  }

  discord_identity(params: { code?: string, discord_identity_id?: string, type: 'join'|'complete' }): Observable<DiscordIdentity|StatusMessage> {
    const apiClient = new ApiClient({ config: this.reportConfig })
    
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
    } else {
      if (params.discord_identity_id) {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const results = await apiClient.post<StatusMessage>(`/fields`, { }) as StatusMessage;
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