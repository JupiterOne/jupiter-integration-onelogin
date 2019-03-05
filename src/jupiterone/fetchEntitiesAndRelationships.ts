import { GraphClient } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_GROUP_RELATIONSHIP_TYPE,
  ACCOUNT_ROLE_RELATIONSHIP_TYPE,
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  AccountEntity,
  AccountGroupRelationship,
  AccountRoleRelationship,
  AccountUserRelationship,
  GROUP_ENTITY_TYPE,
  GroupEntity,
  ROLE_ENTITY_TYPE,
  RoleEntity,
  USER_ENTITY_TYPE,
  USER_GROUP_RELATIONSHIP_TYPE,
  USER_ROLE_RELATIONSHIP_TYPE,
  UserEntity,
  UserGroupRelationship,
  UserRoleRelationship,
} from "./entities";

export interface JupiterOneDataModel {
  accounts: AccountEntity[];
  groups: GroupEntity[];
  users: UserEntity[];
  roles: RoleEntity[];
  userGroupRelationships: UserGroupRelationship[];
  userRoleRelationships: UserRoleRelationship[];
  accountUserRelationships: AccountUserRelationship[];
  accountGroupRelationships: AccountGroupRelationship[];
  accountRoleRelationships: AccountRoleRelationship[];
}

export default async function fetchEntitiesAndRelationships(
  graph: GraphClient,
): Promise<JupiterOneDataModel> {
  const [
    accounts,
    users,
    groups,
    roles,
    userGroupRelationships,
    userRoleRelationships,
    accountUserRelationships,
    accountGroupRelationships,
    accountRoleRelationships,
  ] = await Promise.all([
    graph.findEntitiesByType<AccountEntity>(ACCOUNT_ENTITY_TYPE),
    graph.findEntitiesByType<UserEntity>(USER_ENTITY_TYPE),
    graph.findEntitiesByType<GroupEntity>(GROUP_ENTITY_TYPE),
    graph.findEntitiesByType<RoleEntity>(ROLE_ENTITY_TYPE),
    graph.findRelationshipsByType(USER_GROUP_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType(USER_ROLE_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType(ACCOUNT_USER_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType(ACCOUNT_GROUP_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType(ACCOUNT_ROLE_RELATIONSHIP_TYPE),
  ]);

  return {
    accounts,
    users,
    groups,
    roles,
    userGroupRelationships,
    userRoleRelationships,
    accountUserRelationships,
    accountGroupRelationships,
    accountRoleRelationships,
  };
}
