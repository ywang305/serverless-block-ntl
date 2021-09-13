import middy from "@middy/core";
import { Handler } from "aws-lambda";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const _handler: Handler = async (event, context) => {
  const { name = "corgi friends" } = event.queryStringParameters;

  const { httpMethod, path, body } = event;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
      method: httpMethod,
      path,
      event,
      context,
      __filename,
      __dirname,
      pathparser: require("path").parse(__filename),
      reqBody: body,
      env: process.env.NETLIFY_LOCAL
        ? {
            ...process.env,
          }
        : {
            ...Object.keys(process.env).reduce((a, c) => {
              a[c] = "不让看";
              return a;
            }, {}),
          },
    }),
  };
};

export const handler = middy(_handler).use(httpJsonBodyParser());
