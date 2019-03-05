import { PersisterClient } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  createAccountEntity,
  createAccountGroupRelationships,
  createAccountRoleRelationships,
  createAccountUserRelationships,
  createGroupEntities,
  createRoleEntities,
  createUserEntities,
  createUserGroupRelationships,
  createUserRoleRelationships,
} from "../converters";

import {
  AccountEntity,
  GroupEntity,
  JupiterOneDataModel,
  RoleEntity,
  UserEntity,
} from "../jupiterone";

import { Account, OneLoginDataModel } from "../onelogin/OneLoginClient";

export default async function publishChanges(
  persister: PersisterClient,
  oldData: JupiterOneDataModel,
  oneLoginData: OneLoginDataModel,
  account: Account,
) {
  const newData = convert(oneLoginData, account);

  const entities = [
    ...persister.processEntities<AccountEntity>(
      oldData.accounts,
      newData.accounts,
    ),
    ...persister.processEntities<UserEntity>(oldData.users, newData.users),
    ...persister.processEntities<GroupEntity>(oldData.groups, newData.groups),
    ...persister.processEntities<RoleEntity>(oldData.roles, newData.roles),
  ];

  const relationships = [
    ...persister.processRelationships(
      oldData.accountUserRelationships,
      newData.accountUserRelationships,
    ),
    ...persister.processRelationships(
      oldData.accountGroupRelationships,
      newData.accountGroupRelationships,
    ),
    ...persister.processRelationships(
      oldData.accountRoleRelationships,
      newData.accountRoleRelationships,
    ),
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
  account: Account,
): JupiterOneDataModel {
  return {
    accounts: [createAccountEntity(account)],
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
    accountUserRelationships: createAccountUserRelationships(
      oneLoginDataModel.users,
      account,
    ),
    accountGroupRelationships: createAccountGroupRelationships(
      oneLoginDataModel.groups,
      account,
    ),
    accountRoleRelationships: createAccountRoleRelationships(
      oneLoginDataModel.roles,
      account,
    ),
  };
}
