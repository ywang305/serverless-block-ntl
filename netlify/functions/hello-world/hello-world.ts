import { Handler } from "@netlify/functions";
import { JSONParser } from "../../share/JSONParser";

const PATH = "/hello-";

export const handler: Handler = async (event, context) => {
  const { name = "corgi friends" } = event.queryStringParameters;

  const { body, httpMethod, path } = event;

  const jsonBody = JSONParser.parse(body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
      testKey: process.env.TEST_KEY,
      method: httpMethod,
      path,
      echoBody: jsonBody,
      event,
      context,
      __filename,
      __dirname,
    }),
  };
};
