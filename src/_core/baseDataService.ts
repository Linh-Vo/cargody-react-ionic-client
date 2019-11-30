import axios, { AxiosRequestConfig } from 'axios';
import authService from '../services/authService';

export class BaseDataService {
    constructor() {

    }

    protected get<T>(url: string, config?: AxiosRequestConfig) {
        var axiosConfig = this.requestOptionsWithHeaders(config);
        axiosConfig.method = "GET";
        return axios.get<T>(url, axiosConfig);
    }

    private requestOptionsWithHeaders(config?: AxiosRequestConfig): AxiosRequestConfig {
        var authorizationHeaderValue = `Bearer ${authService.getAccessTokenSubscription().getValue()}`;
        if (config === undefined) {
            config = { headers: {} };
        }
        var configHeaders = config === undefined
            ? { 'Authorization': authorizationHeaderValue }
            : {
                ...config.headers,
                'Authorization': authorizationHeaderValue
            };
        config = {
            ...config,
            headers: configHeaders
        };
        return config;
    }
}