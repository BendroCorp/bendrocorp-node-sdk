import { Channel, ActionCableService }  from 'angular2-actioncable';
import { Observable } from 'rxjs';
import { StreamEvent } from './models/stream-event.model';
import { BaseResource } from './base.resource';
import { AuthClient } from './auth-client';
import { BendroConfiguration } from './configuration';

/**
 * Gives you access to the BendroCorp event stream. Please note this is *not* intended to by users. It is intended to be consumed by client applications.
 */
export class StreamResource extends BaseResource {
  private streamConfig: BendroConfiguration;
  channel: Channel;

  constructor(public params: { auth: AuthClient, useProduction?: boolean  }, private cableService: ActionCableService)
  {
    super(params);

    this.streamConfig =  (this.useProduction) ? new BendroConfiguration({ service: 'main', forWs: true }) : new BendroConfiguration({ service: 'local', forWs: true })
  }
  
  /**
   * 
   */
  get(): Observable<StreamEvent> {
    this.channel = this.cableService
          .cable(`${this.streamConfig.serviceUri}?token=${this.authClient.getCredentials().access_token}`)
          .channel('EventChannel');
    return this.channel.received();
  }
}