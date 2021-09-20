import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { CoinNet } from "../share/Coin";
import { InsightAPI } from "../share/insight/InsightAPI";

import { errorHandler } from "../share/middle/error-handler";

const _handler: Handler = async (event) => {
  const {
    queryStringParameters: {
      address,
      coinName,
      coinNet = CoinNet.mainnet /**可选 [mainnet, testnet] , 默认值 mainnet*/,
    },
  } = event;
  const api = new InsightAPI(coinName, coinNet);
  const data = await api.getBalance(address);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const handler = middy(_handler).use(errorHandler());
