import middy from "@middy/core";
import { Handler } from "aws-lambda";
import axios from "axios";
import {
  GETBLOCK_API_KEY,
  GETBLOCK_BTC_URL,
  RPC_COIN_URL,
} from "../config/keys";
import { errorHandler } from "../share/middle/error-handler";

export const _handler: Handler = async (event) => {
  const {
    queryStringParameters: { height, coinType },
  } = event;

  const payload = {
    jsonrpc: "2.0",
    id: "getblock.io",
    method: "getblockhash",
    params: [Number(height)],
  };

  const url = RPC_COIN_URL.BTC.TESTNET;

  const { data } = await axios.post(url, payload, {
    headers: {
      "x-api-key": GETBLOCK_API_KEY,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const handler = middy(_handler).use(errorHandler());
