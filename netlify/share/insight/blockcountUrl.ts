import { RPC_COIN_URL } from "../../config/keys";

export const getBlockCountUrl = (coinName: string, coinType: string) => {
  coinName = coinName.toUpperCase();
  const isTest = coinType === "1";

  return isTest
    ? RPC_COIN_URL[coinName.toUpperCase()]?.TESTNET
    : RPC_COIN_URL[coinName.toUpperCase()]?.MAINNET;
};
