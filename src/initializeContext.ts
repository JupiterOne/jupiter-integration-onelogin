import { IntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";

import { OneLoginClient } from "./onelogin";

export default async function initializeContext(
  context: IntegrationExecutionContext,
) {
  const { config } = context.instance;

  const provider = new OneLoginClient(config.clientId, config.clientSecret);
  await provider.authenticate();

  const { persister, graph } = context.clients.getClients();

  const account = {
    id: context.instance.id,
    name: context.instance.config.accountName || context.instance.name,
  };

  return {
    graph,
    persister,
    provider,
    account,
  };
}
