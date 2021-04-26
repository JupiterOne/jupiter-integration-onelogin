import {
  GraphClient,
  IntegrationLogger,
  PersisterClient,
  PersisterOperationsResult,
} from "@jupiterone/jupiter-managed-integration-sdk";

export default async function deleteDeprecatedTypes(
  graph: GraphClient,
  persister: PersisterClient,
  logger: IntegrationLogger,
): Promise<PersisterOperationsResult> {
  const deprecatedEntityTypes: string[] = [
    "onelogin_app",
    "onelogin_personal_app",
  ];

  const deprecatedRelationshipTypes: string[] = [
    "onelogin_account_has_app",
    "onelogin_user_assigned_app",
    "onelogin_user_has_personal_app",
  ];

  const deprecatedEntities = [];
  const deprecatedRelationships = [];

  logger.info({ deprecatedEntityTypes }, "Finding deprecated entities by type");
  for (const type of deprecatedEntityTypes) {
    deprecatedEntities.push(...(await graph.findEntitiesByType(type)));
  }
  logger.info(
    { deprecatedEntityCount: deprecatedEntities.length },
    "Found deprecated entities in the graph",
  );

  logger.info(
    { deprecatedRelationshipTypes },
    "Finding deprecated relationships by type",
  );
  for (const type of deprecatedRelationshipTypes) {
    deprecatedRelationships.push(
      ...(await graph.findRelationshipsByType(type)),
    );
  }
  logger.info(
    { deprecatedRelationshipCount: deprecatedRelationships.length },
    "Found deprecated relationships in the graph",
  );

  logger.info(
    "Publishing delete operations for deprecated entities & relationships",
  );
  return persister.publishPersisterOperations([
    persister.processEntities({
      oldEntities: deprecatedEntities,
      newEntities: [],
    }),
    persister.processRelationships({
      oldRelationships: deprecatedRelationships,
      newRelationships: [],
    }),
  ]);
}
