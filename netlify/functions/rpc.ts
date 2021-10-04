import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { makeBlockRpc, makeRPCClient } from "../share/middle/makeBlockRpcObj";
import { errorHandler } from "../share/middle/error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export const _handler: Handler = async (event) => {
  const { rpcClient, body } = event;
  const data = await rpcClient.getBlockCount();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const mids = [httpJsonBodyParser(), makeRPCClient(), errorHandler()];

export const handler = middy(_handler).use(mids);
