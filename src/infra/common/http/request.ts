type AppRequestParams<T = any> = {
    body: T;
    query?: Record<string, unknown>;
    params?: Record<string, number | string>;
    headers?: Record<string, string>;
    url: string;
};

export class AppRequest<T = any> {
    body: T;
    query?: Record<string, unknown>;
    params?: Record<string, number | string>;
    headers?: Record<string, string>;
    url: string;

    constructor({ body, query, params, headers, url }: AppRequestParams<T>) {
        this.body = body;
        this.query = query;
        this.params = params;
        this.headers = headers;
        this.url = url;
    }

    getFullData?() {
        return {
            ...this.params,
            ...this.body,
            ...this.query,
        };
    }
}

export type RequestHandler = (appRequest: AppRequestParams) => any;
