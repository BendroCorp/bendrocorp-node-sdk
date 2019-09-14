import { BaseResource } from "./base.resource";
import { AuthClient } from "./auth-client";
import { ApiClient } from "./api-client";
import { BendroConfiguration } from "./configuration";
import { Offender } from "./models/offender.model";

export class offender extends BaseResource {
  constructor(public params: { auth?: AuthClient }) {
    super(params);
  }
  
  async list(params: { kind: 'offenders'|'reports'|'mine'|'admin' }) {
    let apiClient = new ApiClient({ config: new BendroConfiguration({ service: 'main' }) })
    let results = await apiClient.get<Offender[]>(`/offender-report`);
  } 

  async list_types() {

  }

  async create() {
    
  }

  async update() {
    
  }

  async submit_report() {
    
  }
}