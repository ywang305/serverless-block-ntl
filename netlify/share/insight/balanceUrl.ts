import { INSIGHT_COIN_URL } from "../../config/keys";

import { validate } from "multicoin-address-validator";

export const getBalanceBaseUrl = (address: string) => {
  const testnet = "testnet";
  let baseURL;
  if (validate(address, "btc")) {
    baseURL = INSIGHT_COIN_URL.BTC.MAINNET;
  } else if (validate(address, "btc", testnet)) {
    baseURL = INSIGHT_COIN_URL.BTC.TESTNET;
  } else if (validate(address, "doge")) {
    baseURL = INSIGHT_COIN_URL.DOGE.MAINNET;
  } else if (validate(address, "doge", testnet)) {
    baseURL = INSIGHT_COIN_URL.DOGE.TESTNET;
  } else {
    throw new Error(`未知地址类型, Invalid address = ${address}`);
  }
  return `${baseURL}/address/${address}/balance`;
};
