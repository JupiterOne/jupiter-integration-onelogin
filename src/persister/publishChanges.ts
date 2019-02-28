import { PersisterClient } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  createGroupEntities,
  createRoleEntities,
  createUserEntities,
  createUserGroupRelationships,
  createUserRoleRelationships,
} from "../converters";

import {
  GroupEntity,
  JupiterOneDataModel,
  RoleEntity,
  UserEntity,
} from "../jupiterone";
import { OneLoginDataModel } from "../onelogin/OneLoginClient";

export default async function publishChanges(
  persister: PersisterClient,
  oldData: JupiterOneDataModel,
  oneLoginData: OneLoginDataModel,
) {
  const newData = convert(oneLoginData);

  const entities = [
    ...persister.processEntities<UserEntity>(oldData.users, newData.users),
    ...persister.processEntities<GroupEntity>(oldData.groups, newData.groups),
    ...persister.processEntities<RoleEntity>(oldData.roles, newData.roles),
  ];

  const relationships = [
    ...persister.processRelationships(
      oldData.userGroupRelationships,
      newData.userGroupRelationships,
    ),
    ...persister.processRelationships(
      oldData.userRoleRelationships,
      newData.userRoleRelationships,
    ),
  ];

  return await persister.publishPersisterOperations([entities, relationships]);
}

export function convert(
  oneLoginDataModel: OneLoginDataModel,
): JupiterOneDataModel {
  return {
    groups: createGroupEntities(oneLoginDataModel.groups),
    users: createUserEntities(oneLoginDataModel.users),
    roles: createRoleEntities(oneLoginDataModel.roles),
    userGroupRelationships: createUserGroupRelationships(
      oneLoginDataModel.users,
    ),
    userRoleRelationships: createUserRoleRelationships(
      oneLoginDataModel.users,
      oneLoginDataModel.roles,
    ),
  };
}
