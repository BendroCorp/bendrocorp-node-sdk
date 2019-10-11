export class HttpClientError {
  status: number;
  message?: string;
  data?: any;
  headers: any;
  reqHeaders: any;
  fullError: any;
}