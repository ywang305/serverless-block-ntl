import middy from "@middy/core";
import { Handler } from "aws-lambda";
import axios from "axios";
import { GETBLOCK_API_KEY, GETBLOCK_BTC_URL } from "../config/keys";
import { errorHandler } from "../share/middle/error-handler";

export const _handler: Handler = async (event) => {
  const {
    queryStringParameters: { hash, height },
  } = event;

  let payload;
  if (hash) {
    payload = {
      jsonrpc: "2.0",
      id: "getblock.io",
      method: "getblock",
      params: [hash, 2],
    };
  } else if (height) {
    payload = {
      jsonrpc: "2.0",
      id: "getblock.io",
      method: "getblockhash",
      params: [height],
    };
  }

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

//curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/
