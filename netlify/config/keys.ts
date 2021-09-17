export const GETBLOCK_API_KEY: string = process.env.GETBLOCK_API_KEY_DEV;
export const GETBLOCK_BTC_URL: string = "https://btc.getblock.io/testnet/";

// "https://btc.getblock.io/mainnet/" || "https://btc.getblock.io/testnet/";

export const BITCORE_API_BTC_BASEURL: string =
  "https://api.bitcore.io/api/BTC/testnet";

const BITCORE_BASE_URL = "https://api.bitcore.io/api";
export const INSIGHT_COIN_URL = {
  BTC: {
    MAINNET: BITCORE_BASE_URL + "/BTC/mainnet",
    TESTNET: BITCORE_BASE_URL + "/BTC/testnet",
  },
  DOGE: {
    MAINNET: BITCORE_BASE_URL + "/DOGE/mainnet",
    TESTNET: BITCORE_BASE_URL + "/DOGE/testnet",
  },
};

const RPC_RUL = (name) => `https://${name}.getblock.io`;
export const RPC_COIN_URL = {
  BTC: {
    MAINNET: RPC_RUL("btc") + "/mainnet/",
    TESTNET: RPC_RUL("btc") + "/testnet/",
  },
  DOGE: {
    MAINNET: RPC_RUL("doge") + "/mainnet/",
    TESTNET: RPC_RUL("doge") + "/testnet/",
  },
};
