import axios from "axios";
import { validate } from "multicoin-address-validator";
import { CoinName, CoinNet } from "../Coin";

export class InsightAPI {
  baseUrl: string = "https://api.bitcore.io/api";
  name: string;
  url: string;
  net: CoinNet;
  constructor(name: CoinName, net: CoinNet) {
    this.name = name.toUpperCase();
    this.net = net;
    this.url = this.baseUrl + `/${this.name}` + `/${this.net}`; // e.g. https://api.bitcore.io/api/DOGE/testnet
  }

  guardAddress(address: string) {
    const net = this.net === CoinNet.mainnet ? undefined : CoinNet.testnet;
    if (!validate(address, this.name, net)) {
      throw new Error("无效地址, Invalid Address = " + address);
    }
  }

  async getBalance(address: string) {
    this.guardAddress(address);
    const { data } = await axios.get(this.url + `/address/${address}/balance`);
    return data;
  }
}
