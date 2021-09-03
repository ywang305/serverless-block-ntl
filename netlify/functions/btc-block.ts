import { Handler } from "@netlify/functions";
import axios from "axios";
import { GETBLOCK_API_KEY } from "../config/keys";

export const handler: Handler = async (event) => {
  const {
    queryStringParameters: { hash },
  } = event;

  const payload = {
    jsonrpc: "1.0",
    id: "curltest",
    method: "getblock",
    params: [hash, 2],
  };

  const { data } = await axios.post(
    "https://btc.getblock.io/mainnet/",
    payload,
    {
      headers: { "x-api-key": GETBLOCK_API_KEY },
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
//curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/
