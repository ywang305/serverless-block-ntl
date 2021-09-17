import middy from "@middy/core";
import { Handler } from "aws-lambda";

import axios from "axios";
import { getBalanceBaseUrl } from "../share/insight/balanceUrl";
import { errorHandler } from "../share/middle/error-handler";

const _handler: Handler = async (event) => {
  const {
    queryStringParameters: { address },
  } = event;
  const url = getBalanceBaseUrl(address);
  const { data } = await axios.get(url);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const handler = middy(_handler).use(errorHandler());
