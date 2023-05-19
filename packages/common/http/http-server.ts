export interface HttpServer {
    listen(port: number): Promise<void>;
}

export enum HttpServers {
    EXPRESS = "express",
    FASTFY = "fastfy",
}
