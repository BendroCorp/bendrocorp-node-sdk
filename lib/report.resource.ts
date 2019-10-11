import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { ApiClient } from "./api-client";
import { BendroConfiguration } from "./configuration";
import { Report, ReportTemplate, ReportField, ReportFieldValue } from "./models/report.model";
import { StatusMessage } from "./models/misc.model";
import { Observable, observable, Observer } from 'rxjs';
import { HttpClientError } from "./models/http-model";

export class ReportResource extends BaseResource {
  reportConfig: any;

  constructor(public params: { auth: AuthClient }) {
    super(params);
    this.reportConfig = new BendroConfiguration({ service: 'reports' })
  }
  /**
   * List a collection of resources
   * @param params { type: 'reports'|'templates' }
   */
  list(params: { type: 'reports'|'templates' }): Observable<Report|ReportTemplate>
  {
    let apiClient = new ApiClient({ config: this.reportConfig, auth: this.authClient })
    return Observable.create((observer: Observer<any>) => {
      if (params.type === 'reports') {
        apiClient.get<Report[]>(`/reports`).then((results) => {
          observer.next(results);
          observer.complete();
        }).catch((error) => {
          observer.error(error);
        });
      } else if (params.type === 'templates') {
        apiClient.get<ReportTemplate[]>(`/templates`).then((results) => {
          observer.next(results);
          observer.complete();
        }).catch((error) => {
          observer.error(error);
        });
      } else {
        observer.error('Not a valid list type!');
        observer.complete();
      }
    });
  }

  /**
   * Create a resource
   */
  create(params: { 
    type:'report'|'template'|'field',
    report?: { 
      template_id: string 
    },
    template?: { 
      name: string
    }, 
    field?: {
      template_id: string,
      name: string,
      validator: string,
      field_presentation_type_id: number,
      required: boolean,
      ordinal: number
    } 
  }): Observable<Report|ReportField|ReportTemplate>
  {
    const apiClient = new ApiClient({ config: this.reportConfig, auth: this.authClient })
    return Observable.create(async (observer: Observer<any>) => {
      if (params.type === 'field') {
        if (params.field) {
          try {
            const report = params.field;
            const results = await apiClient.post<ReportField>(`/fields`, { report }) as ReportField;
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'field\' object!' } as HttpClientError);
        }
      } else if (params.type === 'report') {
        if (params.report) {
          try {
            const report_field = params.report;
            const results = await apiClient.post<Report>(`/reports`, { report_field });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'report\' object!' } as HttpClientError);
        }
      } else if (params.type === 'template') {
        if (params.template) {
          try {
            const report_template = params.template;
            const results = await apiClient.post<ReportTemplate>(`/templates`, { report_template });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'template\' object!' } as HttpClientError);
        }
      } else {
        observer.error({ status: 500, message: 'Not a valid create type!' } as HttpClientError);
      }
    });
  }

  /**
   * Update a resource
   */
  update(params: { 
    type:'report'|'template'|'field'|'value',
    report?: { 
      id: number,
      report_for_id: number,
      draft?: boolean
    },
    template?: { 
      id: string,
      name: string
    }, 
    field?: {
      id: string
      name: string,
      validator: string,
      field_presentation_type_id: number,
      required: boolean,
      ordinal: number
    },
    value?: {
      id: string,
      value: string
    }
  }): Observable<Report|ReportField|ReportTemplate|ReportFieldValue> {
    const apiClient = new ApiClient({ config: this.reportConfig, auth: this.authClient })
    return Observable.create(async (observer: Observer<any>) => {
      if (params.type === 'field') {
        if (params.field) {
          try {
            const report = params.field;
            const results = await apiClient.put<ReportField>(`/fields`, { report });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'field\' object!' } as HttpClientError);
        }
      } else if (params.type === 'report') {
        if (params.report) {
          try {
            const report_field = params.report;
            const results = await apiClient.put<Report>(`/reports`, { report_field });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'report\' object!' } as HttpClientError);
        }
      } else if (params.type === 'template') {
        if (params.template) {
          try {
            const report_template = params.template;
            const results = await apiClient.put<ReportTemplate>(`/templates`, { report_template });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'template\' object!' } as HttpClientError);
        }
      } else if (params.type === 'value') {
        if (params.value) {
          try {
            const field_value = params.template;
            const results = await apiClient.put<ReportFieldValue>(`/values`, { field_value });
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'template\' object!' } as HttpClientError);
        }
      } else {
        observer.error({ status: 500, message: 'Not a valid create type!' } as HttpClientError);
      }
    });
  }

  /**
   * Archive a resource
   */
  archive(params: { type:'report'|'template'|'field',
  report?: { 
    id: number
  },
  template?: { 
    id: string
  }, 
  field?: {
    id: string
  } 
  }): Observable<StatusMessage> {
    const apiClient = new ApiClient({ config: this.reportConfig, auth: this.authClient })
    return Observable.create(async (observer: Observer<any>) => {
      if (params.type === 'field') {
        if (params.field) {
          try {
            const object = params.field;
            const results = await apiClient.delete<StatusMessage>(`/fields/${object.id}`);
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'field\' object!' } as HttpClientError);
        }
      } else if (params.type === 'report') {
        if (params.report) {
          try {
            const object = params.report;
            const results = await apiClient.delete<StatusMessage>(`/reports/${object.id}`);
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'report\' object!' } as HttpClientError);
        }
      } else if (params.type === 'template') {
        if (params.template) {
          try {
            const object = params.template;
            const results = await apiClient.delete<StatusMessage>(`/templates/${object.id}`);
            observer.next(results);
            observer.complete();
          } catch (error) {
            observer.error(error as HttpClientError);
          }
        } else {
          observer.error({ status: 500, message: 'To create a template you must include the \'template\' object!' } as HttpClientError);
        }
      } else {
        observer.error({ status: 500, message: 'Not a valid create type!' } as HttpClientError);
      }
    });
  }
}