import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { BendroConfiguration } from "./configuration";
import { Observable, Observer } from "rxjs";
import { Event } from "./models/event.model";
import { HttpClientError } from "./models/http-model";
import { ApiClient } from "./api-client";

export class event extends BaseResource {
  eventConfig: BendroConfiguration;

  constructor(public params: { auth: AuthClient, useProduction?: boolean })
  {
    super(params);

    this.eventConfig = (this.useProduction) ? new BendroConfiguration({ service: 'main' }) : new BendroConfiguration({ service: 'local' })
  }

  list(params: { type: 'current'|'next'|'expired', expired_count?: number }): Observable<Event[]|Event> {
    const apiClient = new ApiClient({ config: this.eventConfig })

    if (params.type === 'current') {
      return Observable.create(async (observer: Observer<any>) => {
        try {
          const results = await apiClient.get<Event[]>(`/events`) as Event[];
          observer.next(results);
          observer.complete();
        } catch (error) {
          observer.error(error as HttpClientError);
        }
      });
    } else if (params.type === 'expired') {
      return Observable.create(async (observer: Observer<any>) => {
        try {
          const results = await apiClient.get<Event[]>(`/events/expired/${params.expired_count}`) as Event[];
          observer.next(results);
          observer.complete();
        } catch (error) {
          observer.error(error as HttpClientError);
        }
      });
    } else if (params.type === 'next') {
      return Observable.create(async (observer: Observer<any>) => {
        try {
          const results = await apiClient.get<Event>(`/events/next`) as Event;
          observer.next(results);
          observer.complete();
        } catch (error) {
          observer.error(error as HttpClientError);
        }
      });
    } 
  }
}