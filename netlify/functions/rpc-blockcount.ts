import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { BlockRPC } from "../share/blockio/BlockRPC";
import { CoinNet } from "../share/Coin";
import { errorHandler } from "../share/middle/error-handler";

export const _handler: Handler = async (event) => {
  const {
    queryStringParameters: { coinName, coinNet = CoinNet.mainnet },
  } = event;

  const rpc = new BlockRPC(coinName, coinNet);
  const data = await rpc.getBlockCount();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const handler = middy(_handler).use(errorHandler());
