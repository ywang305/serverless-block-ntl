//curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "gettxout", "params": ["txid", 1]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/

import { Handler } from "@netlify/functions";
import axios from "axios";
import { GETBLOCK_API_KEY, GETBLOCK_BTC_URL } from "../config/keys";

const makeUtxoUrl = (address) => {
  return `https://api.bitcore.io/api/BTC/testnet/address/${address}`;
};

export const handler: Handler = async (event) => {
  const {
    queryStringParameters: { address },
  } = event;

  const { data: txList } = await axios.get(makeUtxoUrl(address));
  const utxoList = txList.filter((data) => !data.spentTxid);

  return {
    statusCode: 200,
    body: JSON.stringify(utxoList),
  };
};
