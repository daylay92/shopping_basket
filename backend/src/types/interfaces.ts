export interface IConfig {
  /**
   * The port the server listens on for requests.
   */
  PORT: number;
  /**
   * The specific environment where the server is running.
   */
  NODE_ENV: string;
  /**
   *  The mongodb url.
   */
  DATABASE_URL?: string;
}

export interface IResponse<T> {
  status: string;
  data: T;
}
