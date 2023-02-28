export interface Database<T> {
  connect(): Promise<T>;
}
