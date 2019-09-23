import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { ApiClient } from "./api-client";
import { BendroConfiguration } from "./configuration";
import { Report, ReportTemplate, ReportField, ReportFieldValue } from "./models/report.model";
import { StatusMessage } from "./models/misc.model";

export class report extends BaseResource {
  reportConfig: any;

  constructor(public params: { auth?: AuthClient }) {
    super(params);
    this.reportConfig = new BendroConfiguration({ service: 'reports' })
  }

  async list(params: { type: 'reports'|'templates' }): Promise<Report|ReportTemplate>
  {
    let apiClient = new ApiClient({ config: this.reportConfig })
    if (params.type === 'reports') {
      const results = await apiClient.get<Report[]>(`/reports`);
      return results;
    } else if (params.type === 'templates') {
      const results = await apiClient.get<Report[]>(`/reports`);
      return results;
    } else {
      throw 'Not a valid list type!';
    }
  }

  async create(params: { 
    type:'report'|'template'|'field',
    report?: { 
      template_id: number 
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
  }): Promise<Report|ReportField|ReportTemplate>
  {
    const apiClient = new ApiClient({ config: this.reportConfig })

    if (params.type === 'field') {
      if (params.field) {
        const report = params.field;
        const results = await apiClient.post<ReportField>(`/fields`, { report });
        return results;
      } else {
        throw 'To create a template you must include the \'field\' object!'
      }
    } else if (params.type === 'report') {
      if (params.report) {
        const report_field = params.report;
        const results = await apiClient.post<Report>(`/reports`, { report_field });
        return results;
      } else {
        throw 'To create a template you must include the \'report\' object!'
      }
    } else if (params.type === 'template') {
      if (params.template) {
        const report_template = params.template;
        const results = await apiClient.post<ReportTemplate>(`/templates`, { report_template });
        return results;
      } else {
        throw 'To create a template you must include the \'template\' object!'
      }
    } else {
      throw 'Not a valid create type!'; 
    }
  }

  async update(params: { 
    type:'report'|'template'|'field'|'value',
    report?: { 
      id: number,
      report_for_id: number
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
  }): Promise<Report|ReportField|ReportTemplate|ReportFieldValue> {
    const apiClient = new ApiClient({ config: this.reportConfig })

    if (params.type === 'field') {
      if (params.field) {
        const report = params.field;
        const results = await apiClient.put<ReportField>(`/fields`, { report });
        return results;
      } else {
        throw 'To create a template you must include the \'field\' object!'
      }
    } else if (params.type === 'report') {
      if (params.report) {
        const report_field = params.report;
        const results = await apiClient.put<Report>(`/reports`, { report_field });
        return results;
      } else {
        throw 'To create a template you must include the \'report\' object!'
      }
    } else if (params.type === 'template') {
      if (params.template) {
        const report_template = params.template;
        const results = await apiClient.put<ReportTemplate>(`/templates`, { report_template });
        return results;
      } else {
        throw 'To create a template you must include the \'template\' object!'
      }
    } else if (params.type === 'value') {
      if (params.value) {
        const field_value = params.template;
        const results = await apiClient.put<ReportTemplate>(`/templates`, { field_value });
        return results;
      } else {
        throw 'To create a template you must include the \'template\' object!'
      }
    } else {
      throw 'Not a valid create type!'; 
    }
  }

  async archive(params: { type:'report'|'template'|'field',
  report?: { 
    id: number
  },
  template?: { 
    id: string
  }, 
  field?: {
    id: string
  } 
  }): Promise<StatusMessage> {
    const apiClient = new ApiClient({ config: this.reportConfig })

    if (params.type === 'field') {
      if (params.field) {
        const object = params.field;
        const results = await apiClient.delete<StatusMessage>(`/fields/${object.id}`);
        return results;
      } else {
        throw 'To create a template you must include the \'field\' object!'
      }
    } else if (params.type === 'report') {
      if (params.report) {
        const object = params.report;
        const results = await apiClient.delete<StatusMessage>(`/reports/${object.id}`);
        return results;
      } else {
        throw 'To create a template you must include the \'report\' object!'
      }
    } else if (params.type === 'template') {
      if (params.template) {
        const object = params.template;
        const results = await apiClient.delete<StatusMessage>(`/templates/${object.id}`);
        return results;
      } else {
        throw 'To create a template you must include the \'template\' object!'
      }
    } else {
      throw 'Not a valid create type!'; 
    }
  }
}