export class AppRequest {
    body: unknown;
    query: Record<string, unknown>;
    params: unknown;
    headers: Record<string, unknown>;
    url: string;
}

export type RequestHandler = (data: AppRequest) => any;
