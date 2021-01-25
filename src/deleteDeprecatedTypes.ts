import {
  GraphClient,
  PersisterClient,
  PersisterOperationsResult,
} from "@jupiterone/jupiter-managed-integration-sdk";

export default async function deleteDeprecatedTypes(
  graph: GraphClient,
  persister: PersisterClient,
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

  for (const type of deprecatedEntityTypes) {
    deprecatedEntities.push(...(await graph.findEntitiesByType(type)));
  }

  for (const type of deprecatedRelationshipTypes) {
    deprecatedRelationships.push(
      ...(await graph.findRelationshipsByType(type)),
    );
  }

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
