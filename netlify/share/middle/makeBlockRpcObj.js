import { RPC_Client } from "../../service/RPC_Client";
import { BlockRPC } from "../blockio/BlockRPC";
import { CoinNet } from "../Coin";

export const makeBlockRpc = (opt = {}) => {
  const before = async (request) => {
    const { event } = request;
    const {
      queryStringParameters: { coinName, coinNet = CoinNet.mainnet },
    } = event;

    const blockRPC = new BlockRPC(coinName, coinNet);
    event.blockRPC = blockRPC;
  };
  return { before };
};

export const makeRPCClient = (opt = {}) => {
  const before = async (request) => {
    const { event } = request;
    const {
      queryStringParameters: { coinName, coinNet = CoinNet.mainnet },
    } = event;

    event.rpcClient = new RPC_Client(coinName, coinNet);
  };
  return { before };
};
