import { BendroConfiguration } from "./configuration";
import { AuthClient } from './auth-client'
import axios from 'axios';
import { HttpClientError } from "./models/http-model";

export class ApiClient {
  constructor(public params: { config: BendroConfiguration, auth?: AuthClient }) { }

  async get<T>(
    uri: string, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
    ): Promise<any|T> {
      try {
        let reqHeaders = {};
        if (headers) {
          headers.forEach((header) => {
            reqHeaders[header.key] = header.value;
          })
        }

        const results = await axios.get(this.params.config.serviceUri + uri, { headers: reqHeaders });
        const data = results.data as T;
        return data;

      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          return { status: error.response.status, data: error.response.data, headers: error.response.headers } as HttpClientError;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
  }

  async post<T>(
    uri: string,
    data: any, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<any|T> {
    try {
      let reqHeaders = {};
      if (headers) {
        headers.forEach((header) => {
          reqHeaders[header.key] = header.value;
        })
      }

      const results = await axios.get(this.params.config.serviceUri + uri, { headers: reqHeaders });
      const resultData = results.data as T;
      return resultData;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return { status: error.response.status, data: error.response.data, headers: error.response.headers } as HttpClientError;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }

  async put<T>(
    uri: string,
    data: any, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<any|T> {
    try {
      let reqHeaders = {};
      if (headers) {
        headers.forEach((header) => {
          reqHeaders[header.key] = header.value;
        })
      }

      const results = await axios.get(this.params.config.serviceUri + uri, { headers: reqHeaders });
      const resultData = results.data as T;
      return resultData;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return { status: error.response.status, data: error.response.data, headers: error.response.headers } as HttpClientError;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }

  async delete<T>(
    uri: string, 
    headers?: [
      {
        key: string; 
        value: string;
      }]
  ): Promise<any|T> {
    try {
      let reqHeaders = {};
      if (headers) {
        headers.forEach((header) => {
          reqHeaders[header.key] = header.value;
        })
      }

      const results = await axios.get(this.params.config.serviceUri + uri, { headers: reqHeaders });
      const data = results.data as T;
      return data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return { status: error.response.status, data: error.response.data, headers: error.response.headers } as HttpClientError;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }
}