//curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "gettxout", "params": ["txid", 1]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/

import { Handler } from "@netlify/functions";
import axios from "axios";
import { BITCORE_API_BTC_BASEURL } from "../config/keys";

const makeUtxoUrlByAddress = (address) =>
  `${BITCORE_API_BTC_BASEURL}/address/${address}`;

export const handler: Handler = async (event) => {
  const {
    queryStringParameters: { address },
  } = event;

  const { data: txList } = await axios.get(makeUtxoUrlByAddress(address));
  const utxoList = txList.filter((data) => !data.spentTxid);

  return {
    statusCode: 200,
    body: JSON.stringify(utxoList),
  };
};
