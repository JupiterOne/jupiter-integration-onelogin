import { GraphClient } from "@jupiterone/jupiter-managed-integration-sdk";
import {
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
  groups: GroupEntity[];
  users: UserEntity[];
  roles: RoleEntity[];
  userGroupRelationships: UserGroupRelationship[];
  userRoleRelationships: UserRoleRelationship[];
}

export default async function fetchEntitiesAndRelationships(
  graph: GraphClient,
): Promise<JupiterOneDataModel> {
  const [
    users,
    groups,
    roles,
    userGroupRelationships,
    userRoleRelationships,
  ] = await Promise.all([
    graph.findEntitiesByType<UserEntity>(USER_ENTITY_TYPE),
    graph.findEntitiesByType<GroupEntity>(GROUP_ENTITY_TYPE),
    graph.findEntitiesByType<RoleEntity>(ROLE_ENTITY_TYPE),
    graph.findRelationshipsByType(USER_GROUP_RELATIONSHIP_TYPE),
    graph.findRelationshipsByType(USER_ROLE_RELATIONSHIP_TYPE),
  ]);

  return {
    users,
    groups,
    roles,
    userGroupRelationships,
    userRoleRelationships,
  };
}
