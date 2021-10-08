import middy from "@middy/core";
import { Handler } from "aws-lambda";
import { errorHandler } from "../share/middle/error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { IApiClient } from "../service/IApi_Client";
import { makeApiClient } from "../share/middle/makeApiClient";

export const _handler: Handler = async (event) => {
  const { apiClient, body } = event;
  const data = await (apiClient as IApiClient).systemInfo();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const mids = [httpJsonBodyParser(), makeApiClient(), errorHandler()];

export const handler = middy(_handler).use(mids);
