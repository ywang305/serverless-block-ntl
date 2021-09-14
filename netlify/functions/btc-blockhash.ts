import middy from "@middy/core";
import { Handler } from "aws-lambda";
import axios from "axios";
import { GETBLOCK_API_KEY, GETBLOCK_BTC_URL } from "../config/keys";
import { errorHandler } from "../share/middle/error-handler";

export const _handler: Handler = async (event) => {
  const {
    queryStringParameters: { height },
  } = event;

  const payload = {
    jsonrpc: "2.0",
    id: "getblock.io",
    method: "getblockhash",
    params: [Number(height)],
  };

  const { data } = await axios.post(GETBLOCK_BTC_URL, payload, {
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
