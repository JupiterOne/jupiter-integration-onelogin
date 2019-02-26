import initializeContext from "./initializeContext";
import OneLoginClient from "./OneLoginClient";

import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  createAccountEntity,
  // createAccountRelationships,
} from "./converters";

import { ACCOUNT_ENTITY_TYPE, AccountEntity } from "./types";

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): Promise<IntegrationExecutionResult> {
  const { graph, persister, onelogin } = initializeContext(context);

  const [oldAccountEntities, newAccountEntities] = await Promise.all([
    graph.findEntitiesByType<AccountEntity>(ACCOUNT_ENTITY_TYPE),
    fetchAccountEntitiesFromProvider(onelogin),
  ]);

  return {
    operations: await persister.publishPersisterOperations([
      persister.processEntities(oldAccountEntities, newAccountEntities),
      [],
    ]),
  };
}

async function fetchAccountEntitiesFromProvider(
  onelogin: OneLoginClient,
): Promise<AccountEntity[]> {
  return [createAccountEntity(await onelogin.fetchAccountDetails())];
}
