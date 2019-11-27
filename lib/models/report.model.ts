export class Report {
  id?: string;
  template_id?: string;
  created_by_id?: string;
  report_for_id?: string;
  draft?: boolean;
  approved?: boolean;
  fields?: ReportField[];
}

export class ReportTemplate {
  id?: string;
  name?: string;
  draft?: boolean;
  fields?: ReportField[];
}

export class ReportHandler {
  id?: string;
  name?: string;
  variables: ReportHandlerVariable[];
}

export class ReportHandlerVariable {
  id?: string;
  handler_id?: string;
  name?: string;
  object_name?: string;
}

export class ReportField {
  id?: string;
  template_id?: string;
  report_id?: string;
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