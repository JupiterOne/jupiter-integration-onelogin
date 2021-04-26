import { IntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";

import { OneLoginClient } from "./onelogin";

export default async function initializeContext(
  context: IntegrationExecutionContext,
) {
  const { instance, logger } = context;
  const { config } = instance;

  logger.info("Initializing OneLoginClient");
  const provider = new OneLoginClient(
    config.clientId,
    config.clientSecret,
    logger,
  );
  await provider.authenticate();

  logger.info("Initializing persister and graph clients");
  const { persister, graph } = context.clients.getClients();

  const account = {
    id: context.instance.id,
    name: context.instance.config.accountName || context.instance.name,
    orgUrl: context.instance.config.orgUrl,
  };

  return {
    graph,
    persister,
    provider,
    account,
  };
}
