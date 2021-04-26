import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  summarizePersisterOperationsResults,
} from "@jupiterone/jupiter-managed-integration-sdk";
import deleteDeprecatedTypes from "./deleteDeprecatedTypes";

import initializeContext from "./initializeContext";
import fetchEntitiesAndRelationships from "./jupiterone/fetchEntitiesAndRelationships";
import fetchOneLoginData from "./onelogin/fetchOneLoginData";
import publishChanges from "./persister/publishChanges";

export default async function executionHandler(
  context: IntegrationExecutionContext,
): Promise<IntegrationExecutionResult> {
  const { logger } = context;
  const { graph, persister, provider, account } = await initializeContext(
    context,
  );

  const oldData = await fetchEntitiesAndRelationships(graph, logger);
  const oneLoginData = await fetchOneLoginData(provider);

  return {
    operations: summarizePersisterOperationsResults(
      await publishChanges(
        persister,
        oldData,
        oneLoginData,
        account,
        logger.child({ stepId: "publishChanges" }),
      ),
      await deleteDeprecatedTypes(
        graph,
        persister,
        logger.child({ stepId: "deleteDeprecatedTypes" }),
      ),
    ),
  };
}
