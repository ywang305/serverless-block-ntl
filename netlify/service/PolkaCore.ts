import { ApiPromise, WsProvider } from "@polkadot/api";
import { IApiClient, TestInfo } from "./IApiClient";

const wsProvider = new WsProvider("wss://rpc.polkadot.io");

export class PolkaCore implements IApiClient {
  api?: ApiPromise;

  async getAPI(): Promise<ApiPromise> {
    this.api = this.api ?? (await ApiPromise.create({ provider: wsProvider }));
    return this.api;
  }

  async getSystemInfo(): Promise<TestInfo> {
    const api = await this.getAPI();
    const [chain, nodeName, nodeVersion, properties] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.system.properties(),
    ]);
    return { chain, nodeName, nodeVersion, properties };
  }

  /**
   * single query
   * @param address
   * @returns
   */
  async getAccountInfo(address: string): Promise<any> {
    const api = await this.getAPI();
    const accountInfo = await api.query.system.account(address);
    return accountInfo;
  }

  /**
   * polka Multi query
   * @param addresses
   * @returns
   */
  async getAccountsInfo(addresses: Array<string>) {
    const api = await this.getAPI();
    const accountInfos = await api.query.system.account.multi(addresses);
    return accountInfos;
  }

  async getHeader() {
    const api = await this.getAPI();
    const latestHdr = await api.rpc.chain.getHeader();
    return latestHdr;
  }
  async getBlockHash() {
    const api = await this.getAPI();
    const lastHdr = this.getHeader();
    const startNum = (await lastHdr).number.unwrap().subn(400);
    const startHdr = await api.rpc.chain.getBlockHash(startNum);
    return startHdr;
  }
}
