export interface Server {
  listen(port: number): Promise<void>;
}
