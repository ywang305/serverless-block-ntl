import { Handler } from "@netlify/functions";
import axios from "axios";
import { BITCORE_API_BTC_BASEURL } from "../config/keys";

const makeUrlByTxid = (txid) => `${BITCORE_API_BTC_BASEURL}/tx/${txid}/coins`;

export const handler: Handler = async (event) => {
  const {
    queryStringParameters: { txID },
  } = event;

  const {
    data: { inputs, outputs },
  } = await axios.get(makeUrlByTxid(txID));

  return {
    statusCode: 200,
    body: JSON.stringify({ inputs, outputs }),
  };
};

/**
 * {
        inputs: [
        {
        _id: "613f752aa8e6754d2324fe5f",
        chain: "BTC",
        network: "testnet",
        coinbase: false,
        mintIndex: 1,
        spentTxid: "9a8889abaaa857e071840a39dc31fb6b4b54bf80af231bb9f68f11a1de672738",
        mintTxid: "c9f7b1750256abea5493eb73c9054b49c4867f6df18654665e8d34a347dd76f6",
        mintHeight: 2093605,
        spentHeight: 2093622,
        address: "myVjmcbb6MrzPEUxPbjojMz2VoQihJJrnv",
        script: "76a914c5376498a5e702bc233f0f8f8af32981585accda88ac",
        value: 5649761,
        confirmations: -1,
        sequenceNumber: 4294967295
        }
        ],
        outputs: [
        {
        _id: "613f87d5a8e6754d23760ac9",
        chain: "BTC",
        network: "testnet",
        coinbase: false,
        mintIndex: 0,
        spentTxid: "",
        mintTxid: "9a8889abaaa857e071840a39dc31fb6b4b54bf80af231bb9f68f11a1de672738",
        mintHeight: 2093622,
        spentHeight: -2,
        address: "mtLg7qjsFGP3oUrTGCA7LiB3xKb1He6Um7",
        script: "76a9148ca7f8f2e4a366969ac476b177cd13bc0de8108f88ac",
        value: 7500,
        confirmations: -1
        },
        {
        _id: "613f87d5a8e6754d23760aca",
        chain: "BTC",
        network: "testnet",
        coinbase: false,
        mintIndex: 1,
        spentTxid: "",
        mintTxid: "9a8889abaaa857e071840a39dc31fb6b4b54bf80af231bb9f68f11a1de672738",
        mintHeight: 2093622,
        spentHeight: -2,
        address: "mg5BH3gH9DEazQhstNWjtde4Au5e36u4J9",
        script: "76a914061825ec4e1e1b137993431f83addade4cc7d2e288ac",
        value: 6500,
        confirmations: -1
        },
        {
        _id: "613f87d5a8e6754d23760acb",
        chain: "BTC",
        network: "testnet",
        coinbase: false,
        mintIndex: 2,
        spentTxid: "",
        mintTxid: "9a8889abaaa857e071840a39dc31fb6b4b54bf80af231bb9f68f11a1de672738",
        mintHeight: 2093622,
        spentHeight: -2,
        address: "myVjmcbb6MrzPEUxPbjojMz2VoQihJJrnv",
        script: "76a914c5376498a5e702bc233f0f8f8af32981585accda88ac",
        value: 5635261,
        confirmations: -1
        }
        ]
}
 */
