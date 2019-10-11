import { BendroConfiguration } from "./configuration";
import { AuthClient } from './auth-client'
import axios from 'axios';
import { HttpClientError } from "./models/http-model";

/**
 * Internal API client. DO NOT INSTANTIATE DIRECTLY.
 */
export class ApiClient {
  constructor(public params: { config: BendroConfiguration, auth?: AuthClient }) {
    //
  }

  async get<T>(
    uri: string, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
    ): Promise<T|HttpClientError> {
      return new Promise<T|HttpClientError>(async (resolve, reject) => {
        let reqHeaders = {};
        if (headers) {
          headers.forEach((header) => {
            reqHeaders[header.key] = header.value;
          })
        }

        if (this.params.auth) {
          const authHeader = await this.params.auth.getAuthHeader()
          if (authHeader) {
            reqHeaders['Authorization'] = authHeader;
          }
        }

        try {
          const results = await axios.get(this.params.config.serviceUri + uri, { headers: reqHeaders });
          const data = results.data as T;
          resolve(data);
  
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
  
            reject({ status: error.response.status, data: error.response.data, headers: error.response.headers, reqHeaders: reqHeaders, fullError: error } as HttpClientError);
          } else {
            // Something happened in setting up the request that triggered an Error
            reject(error);
          }
        }
      });
  }

  async post<T>(
    uri: string,
    data: any, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<T|HttpClientError> {
    return new Promise<T|HttpClientError>(async (resolve, reject) => {
      try {
        let reqHeaders = {};
        if (headers) {
          headers.forEach((header) => {
            reqHeaders[header.key] = header.value;
          })
        }
  
        if (this.params.auth) {
          const authHeader = await this.params.auth.getAuthHeader()
          if (authHeader) {
            reqHeaders['Authorization'] = authHeader;
          }
        }
  
        const results = await axios.post(this.params.config.serviceUri + uri, { headers: reqHeaders });
        const resultData = results.data as T;
        resolve(resultData);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
  
          reject({ status: error.response.status, data: error.response.data, headers: error.response.headers, fullError: error } as HttpClientError);
        } else {
          // Something happened in setting up the request that triggered an Error
          reject(error);
        }
      }
    });
  }

  async put<T>(
    uri: string,
    data: any, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<T|HttpClientError> {
    return new Promise<T|HttpClientError>(async (resolve, reject) => {
      try {
        let reqHeaders = {};
        if (headers) {
          headers.forEach((header) => {
            reqHeaders[header.key] = header.value;
          })
        }
  
        if (this.params.auth) {
          const authHeader = await this.params.auth.getAuthHeader()
          if (authHeader) {
            reqHeaders['Authorization'] = authHeader;
          }
        }
  
        const results = await axios.put(this.params.config.serviceUri + uri, { headers: reqHeaders });
        const resultData = results.data as T;
        resolve(resultData);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
  
          reject({ status: error.response.status, data: error.response.data, headers: error.response.headers, fullError: error } as HttpClientError);
        } else {
          // Something happened in setting up the request that triggered an Error
          reject(error);
        }
      }
    });
  }

  async delete<T>(
    uri: string, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<T|HttpClientError> {
    return new Promise<T|HttpClientError>(async (resolve, reject) => {
      try {
        let reqHeaders = {};
        if (headers) {
          headers.forEach((header) => {
            reqHeaders[header.key] = header.value;
          })
        }
  
        if (this.params.auth) {
          const authHeader = await this.params.auth.getAuthHeader()
          if (authHeader) {
            reqHeaders['Authorization'] = authHeader;
          }
        }
  
        const results = await axios.delete(this.params.config.serviceUri + uri, { headers: reqHeaders });
        const data = results.data as T;
        resolve(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
  
          reject({ status: error.response.status, data: error.response.data, headers: error.response.headers, fullError: error } as HttpClientError);
        } else {
          // Something happened in setting up the request that triggered an Error
          reject(error)
        }
      }
    });
  }
}