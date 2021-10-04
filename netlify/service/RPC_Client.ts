import axios, { AxiosInstance } from "axios";
import { GETBLOCK_API_KEY } from "../config/keys";
import { CoinName, CoinNet } from "../constant/Coin";

export class RPC_Client {
  axios: AxiosInstance;

  constructor(coinName: CoinName, coinNet: CoinNet) {
    const baseURL = `https://${coinName}.getblock.io/${coinNet}`;
    this.axios = axios.create({
      baseURL,
      headers: {
        "x-api-key": GETBLOCK_API_KEY,
      },
    });
  }

  async getBlockCount() {
    const payload = {
      jsonrpc: "2.0",
      method: "getblockcount",
      params: [],
      id: "getblock.io",
    };
    const { data } = await this.axios.post("/", payload);
    return data;
  }

  /**
   *  General purpose request
   * @param method
   * @param params
   * @returns resp json
   */
  async request(method: string, params: Array<any>) {
    const payload = {
      jsonrpc: "2.0",
      method,
      params,
      id: "block-ntl",
    };
    const { data } = await this.axios.post("/", payload);
    return data;
  }
}
