/**
 * curl --location --request POST 'https://btc.getblock.io/mainnet/' 
--header 'x-api-key: YOUR-API-KEY' 
--header 'Content-Type: application/json' 
--data-raw '{"jsonrpc": "2.0",
"method": "sendrawtransaction",
"params": ["hexstring", null],
"id": "getblock.io"}'
 */

import axios from "axios";
import { GETBLOCK_API_KEY, GETBLOCK_BTC_URL } from "../config/keys";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { errorHandler } from "../share/middle/error-handler";

const _handler: Handler = async (event) => {
  const {
    body: { signedTx },
  } = event;

  const payload = {
    jsonrpc: "2.0",
    id: "getblock.io",
    method: "sendrawtransaction",
    params: [signedTx, null],
  };

  await axios.post(GETBLOCK_BTC_URL, payload, {
    headers: { "x-api-key": GETBLOCK_API_KEY },
  });

  return {
    statusCode: 200,
  };
};

export const handler = middy(_handler)
  .use(httpJsonBodyParser())
  .use(errorHandler());
