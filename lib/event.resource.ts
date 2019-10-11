import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { BendroConfiguration } from "./configuration";
import { Observable, Observer } from "rxjs";
import { Event, EventAttendence } from "./models/event.model";
import { HttpClientError } from "./models/http-model";
import { ApiClient } from "./api-client";
import { StatusMessage } from "./models/misc.model";

export class event extends BaseResource {
  eventConfig: BendroConfiguration;

  constructor(public params: { auth: AuthClient, useProduction?: boolean })
  {
    super(params);

    this.eventConfig = (this.useProduction) ? new BendroConfiguration({ service: 'main' }) : new BendroConfiguration({ service: 'local' })
  }

  /**
   * Fetch an event or set of events
   * @param params Parameter list.
   */
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

  /**
   * Set attendence for an event. Please note 'auto' is only available to bot users and regulars users will get an error if they try to use it.
   * @param params { type: 'manual'|'auto', event_id: number }
   */
  attendance(params: { type: 'manual'|'auto', event_id: number, attendence_type_id?:1|2|3, discord_user_ids?: string[] }): Observable<EventAttendence|StatusMessage> {
    const apiClient = new ApiClient({ config: this.eventConfig })

    if (params.type === 'manual') {
      if (params.attendence_type_id) {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const results = await apiClient.post<EventAttendence>(`/events/attend`, { event_id: params.event_id, attendence_type_id: params.attendence_type_id }) as EventAttendence;
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        });
      } else {
        throw 'Attendance type id is required for setting manual attendance.'
      }
    } else if (params.type === 'auto') {
      if (params.discord_user_ids) {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const results = await apiClient.post<EventAttendence>(`/events/attend`, { event_id: params.event_id, attendence_type_id: params.attendence_type_id }) as EventAttendence;
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        });
      } else {
        throw 'discord_user_ids array required for setting auto attendance'
      }
    }
  }
}