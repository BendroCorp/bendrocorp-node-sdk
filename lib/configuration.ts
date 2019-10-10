export class BendroConfiguration {
  constructor(params?: { 
    /**
     * Select the service resource
     */
    service?: 'main'|'reports'|'tasks'|'local', 
    /**
     * For WebSockets
     */
    forWs?: boolean,
    /**
     * If you want to inject a URI
     */
    uriBase?: string,
    /**
     * Skip appending /api
     */
    skipAppendApi?: boolean
  }) {
    if (params) {
      if (params.uriBase && !params.service) {
        this.serviceUri = params.uriBase;
      } else if (params.service && !params.uriBase) {
        if (params.forWs) {
          if (params.service === 'main') {
            this.serviceUri = this.apiMainUri;
          } else if (params.service === 'reports') {
            this.serviceUri = this.apiReportsUri;
          } else if (params.service === 'tasks') {
            this.serviceUri = this.apiTasksUri;
          } else if (params.service === 'local') {
            this.serviceUri = this.localUri;
          }
          
          // always append cable
          this.serviceUri = `${this.serviceUri}/cable`

        } else {
          if (params.service === 'main') {
            this.serviceUri = this.apiMainUri;
          } else if (params.service === 'reports') {
            this.serviceUri = this.apiReportsUri;
          } else if (params.service === 'tasks') {
            this.serviceUri = this.apiTasksUri;
          } else if (params.service === 'local') {
            this.serviceUri = this.localUri;
          }
  
          if (!params.skipAppendApi) {
            this.serviceUri = `${this.serviceUri}/api`
          }
        }
      } else {
        throw 'You cannot specify both the \'uriBase\' and \'service\' identifier';
      }
    } else {
      this.serviceUri = this.apiMainUri;
    }
  }

  public readonly serviceUri: string;
  private readonly apiMainUri: string = "https://api.bendrocorp.com";
  private readonly apiReportsUri: string = "https://api.reports.bendrocorp.com";
  private readonly apiTasksUri: string = "https://api.tasks.bendrocorp.com";
  private readonly localUri: string = 'http://localhost:3000';
}