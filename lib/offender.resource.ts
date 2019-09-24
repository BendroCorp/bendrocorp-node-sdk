import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { ApiClient } from "./api-client";
import { BendroConfiguration } from "./configuration";
import { Offender, OffenderReport } from "./models/offender.model";

export class offenderResource extends BaseResource {
  offenderConfig = new BendroConfiguration({ service: 'main' })

  constructor(public params: { auth?: AuthClient }) {
    super(params);
  }
  
  async list(params: { kind: 'offenders'|'reports'|'mine'|'admin' }) {
    let apiClient = new ApiClient({ config: this.offenderConfig })
    let results = await apiClient.get<Offender[]>(`/offender-report`);
  } 

  async list_types(params: { kind: 'ratings'|'infractions'|'force_level' }) {
    return null;
  }

  async create(params: { report: OffenderReport }) {
    return null;
  }

  async update(params: { report: OffenderReport }) {
    return null;
  }

  async submit_report(params: { report: OffenderReport }): Promise<OffenderReport> {
    return null;
  }
}