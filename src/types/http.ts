export enum HttpStatusCode {
  OK = 200,
}

export type HttpResponse = { statusCode: HttpStatusCode; data: any };
