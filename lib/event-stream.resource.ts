// import { Channel, ActionCableService } from 'angular2-actioncable';
import * as actioncable from 'actioncable'
import { Observable, Observer } from 'rxjs';
import { StreamEvent } from './models/stream-event.model';
import { BaseResource } from './base.resource';
import { AuthClient } from './auth-client';
import { BendroConfiguration } from './configuration';
import { HttpClientError } from './models/http-model';

/**
 * Gives you access to the BendroCorp event stream. Please note this is *not* intended to by users. It is intended to be consumed by client applications.
 */
export class StreamResource extends BaseResource {
  private streamConfig: BendroConfiguration;
  // channel: Channel;

  constructor(public params: { auth: AuthClient, useProduction?: boolean })
  {
    super(params);

    this.streamConfig = (this.useProduction) ? new BendroConfiguration({ service: 'main', forWs: true }) : new BendroConfiguration({ service: 'local', forWs: true })
  }
  
  /**
   * Get the event stream
   */
  get(): Observable<StreamEvent> {
    const fullCableUri = `${this.streamConfig.serviceUri}?token=${this.authClient.getCredentials().access_token}`;
    console.log(`Cable service URI: ${fullCableUri}`);

    let cable = actioncable.createConsumer(fullCableUri);
    cable.connect();

    return Observable.create(async (observer: Observer<any>) => {
      try {
        cable.subscriptions.create({ channel: 'EventChannel' }, { 
          received: function(data) {
            observer.next(data as StreamEvent);
            observer.complete();
          },
          connected: function() {
            //
            console.log(`Connected to: ${fullCableUri}`);
          },
          disconnected: () => {
            //
            console.log(`Disconnected from: ${fullCableUri}`);
          },
        })
        
      } catch (error) {
        observer.error(error as HttpClientError);
      }
    });

    
    
    // this.channel = new ActionCableService()
    //       .cable(fullCableUri)
    //       .channel('EventChannel');
    // return this.channel.received();
    
  }
}