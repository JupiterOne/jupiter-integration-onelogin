import {
  GraphClient,
  IntegrationLogger,
  RelationshipFromIntegration,
} from "@jupiterone/jupiter-managed-integration-sdk";
import * as Entities from "./entities";

export interface JupiterOneEntitiesData {
  accounts: Entities.AccountEntity[];
  groups: Entities.GroupEntity[];
  users: Entities.UserEntity[];
  roles: Entities.RoleEntity[];
  apps: Entities.AppEntity[];
  personalApps: Entities.PersonalAppEntity[];
  devices: Entities.PersonalDeviceEntity[];
  services: Entities.ServiceEntity[];
}

export interface JupiterOneRelationshipsData {
  userGroupRelationships: Entities.UserGroupRelationship[];
  userRoleRelationships: Entities.UserRoleRelationship[];
  userAppRelationships: Entities.UserAppRelationship[];
  userPersonalAppRelationships: Entities.UserPersonalAppRelationship[];
  userPersonalDeviceRelationships: Entities.UserPersonalDeviceRelationship[];

  accountAppRelationships: Entities.AccountAppRelationship[];
  accountUserRelationships: Entities.AccountUserRelationship[];
  accountGroupRelationships: Entities.AccountGroupRelationship[];
  accountRoleRelationships: Entities.AccountRoleRelationship[];
  accountPersonalDeviceRelationships: Entities.AccountPersonalDeviceRelationship[];
  accountServiceRelationships: Entities.AccountServiceRelationship[];
}

export interface JupiterOneDataModel {
  entities: JupiterOneEntitiesData;
  relationships: JupiterOneRelationshipsData;
}

export default async function fetchEntitiesAndRelationships(
  graph: GraphClient,
  logger: IntegrationLogger,
): Promise<JupiterOneDataModel> {
  const data: JupiterOneDataModel = {
    entities: await fetchEntities(graph, logger),
    relationships: await fetchRelationships(graph, logger),
  };

  return data;
}

async function fetchEntities(
  graph: GraphClient,
  logger: IntegrationLogger,
): Promise<JupiterOneEntitiesData> {
  logger.info("Fetching existing entities from JupiterOne");
  const [
    accounts,
    users,
    groups,
    roles,
    apps,
    personalApps,
    devices,
    services,
  ] = await Promise.all([
    graph.findEntitiesByType<Entities.AccountEntity>(
      Entities.ACCOUNT_ENTITY_TYPE,
    ),
    graph.findEntitiesByType<Entities.UserEntity>(Entities.USER_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.GroupEntity>(Entities.GROUP_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.RoleEntity>(Entities.ROLE_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.AppEntity>(Entities.APP_ENTITY_TYPE),
    graph.findEntitiesByType<Entities.PersonalAppEntity>(
      Entities.PERSONAL_APP_ENTITY_TYPE,
    ),
    graph.findEntitiesByType<Entities.PersonalDeviceEntity>(
      Entities.PERSONAL_DEVICE_ENTITY_TYPE,
    ),
    graph.findEntitiesByType<Entities.ServiceEntity>(
      Entities.SERVICE_ENTITY_TYPE,
    ),
  ]);

  return {
    accounts,
    users,
    groups,
    roles,
    apps,
    personalApps,
    devices,
    services,
  } as JupiterOneEntitiesData;
}

export async function fetchRelationships(
  graph: GraphClient,
  logger: IntegrationLogger,
): Promise<JupiterOneRelationshipsData> {
  logger.info("Fetching existing relationships in JupiterOne");
  const [
    userGroupRelationships,
    userRoleRelationships,
    userAppRelationships,
    userPersonalAppRelationships,
    userPersonalDeviceRelationships,

    accountAppRelationships,
    accountUserRelationships,
    accountGroupRelationships,
    accountRoleRelationships,
    accountPersonalDeviceRelationships,
    accountServiceRelationships,
  ] = await Promise.all([
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.USER_GROUP_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.USER_ROLE_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.USER_APP_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.USER_PERSONAL_APP_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.USER_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
    ),

    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_APP_RELATIONSHIP_CLASS,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_USER_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_GROUP_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_ROLE_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
    ),
    graph.findRelationshipsByType<RelationshipFromIntegration>(
      Entities.ACCOUNT_SERVICE_RELATIONSHIP_TYPE,
    ),
  ]);

  return {
    userGroupRelationships,
    userRoleRelationships,
    userAppRelationships,
    userPersonalAppRelationships,
    userPersonalDeviceRelationships,

    accountAppRelationships,
    accountUserRelationships,
    accountGroupRelationships,
    accountRoleRelationships,
    accountPersonalDeviceRelationships,
    accountServiceRelationships,
  };
}
