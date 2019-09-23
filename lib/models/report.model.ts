export class Report {
  id?: number;
  template_id?: string;
  created_by_id?: string;
  report_for_id?: string;
  draft?: boolean;
  approved?: boolean;
  fields?: ReportField[]
}

export class ReportTemplate {
  id?: string;
  name?: string;
}

export class ReportField {
  id?: string;
  template_id?: string;
  name?: string;
  validator?: string;
  field_presentation_type_id?: number;
  required?: boolean;
  ordinal?: number;

  field_value?: ReportFieldValue;
}

export class ReportFieldValue {
  id?: string;
  field_id?: string;
  report_id?: string;
  value?: string;
}