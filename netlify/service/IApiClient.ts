export type TestInfo = {
  chain?: unknown;
  nodeName?: unknown;
  nodeVersion?: unknown;
  properties?: unknown;
};

export interface IApiClient {
  getSystemInfo(): Promise<TestInfo>;
  getAccountInfo(address: string): Promise<any>;
  getAccountsInfo(addresses: Array<string>): Promise<Array<any>>;
  getHeader(hash?: string): Promise<any>;
  getBlockHash(number: number): Promise<any>;
}
