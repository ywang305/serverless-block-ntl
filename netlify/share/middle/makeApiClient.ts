import { IApiClient } from "../../service/IApiClient";
import { PolkaCore } from "../../service/PolkaCore";

export const makeApiClient = (opt = {}) => {
  const before = async (request) => {
    const { event } = request;
    const {
      queryStringParameters: { apiName },
    } = event;

    if (apiName === "polkadot") {
      const apiClient: IApiClient = await new PolkaCore();
      event.apiClient = apiClient;
    }
  };
  return { before };
};
