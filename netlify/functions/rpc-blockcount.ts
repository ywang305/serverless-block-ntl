import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { BlockRPC } from "../share/blockio/BlockRPC";
import { CoinNet } from "../share/Coin";
import { makeBlockRpc } from "../share/middle/makeBlockRpcObj";
import { errorHandler } from "../share/middle/error-handler";

export const _handler: Handler = async (event) => {
  const rpc = event.blockRPC;
  const data = await rpc.getBlockCount();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const mids = [makeBlockRpc(), errorHandler()];

export const handler = middy(_handler).use(mids);
