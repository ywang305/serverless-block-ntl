import axios, { AxiosInstance } from "axios";
import { GETBLOCK_API_KEY } from "../../config/keys";
import { CoinName, CoinNet } from "../Coin";

export class BlockRPC {
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
}
