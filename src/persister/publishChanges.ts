import {
  EntityFromIntegration,
  EntityOperation,
  PersisterClient,
  RelationshipOperation,
} from "@jupiterone/jupiter-managed-integration-sdk";

import {
  createAccountAppRelationships,
  createAccountEntity,
  createAccountGroupRelationships,
  createAccountPersonalDeviceRelationships,
  createAccountRoleRelationships,
  createAccountServiceRelationships,
  createAccountUserRelationships,
  createAppEntities,
  createGroupEntities,
  createPersonalAppEntities,
  createPersonalDeviceEntities,
  createRoleEntities,
  createUserAppRelationships,
  createUserEntities,
  createUserGroupRelationships,
  createUserPersonalAppRelationships,
  createUserPersonalDeviceRelationships,
  createUserRoleRelationships,
  getServiceEntities,
} from "../converters";

import {
  JupiterOneDataModel,
  JupiterOneEntitiesData,
  JupiterOneRelationshipsData,
} from "../jupiterone";

import { Account, OneLoginDataModel } from "../onelogin/OneLoginClient";

type EntitiesKeys = keyof JupiterOneEntitiesData;
type RelationshipsKeys = keyof JupiterOneRelationshipsData;

export default async function publishChanges(
  persister: PersisterClient,
  oldData: JupiterOneDataModel,
  oneLoginData: OneLoginDataModel,
  account: Account,
) {
  const newData = convert(oneLoginData, account);

  const entities = createEntitiesOperations(
    oldData.entities,
    newData.entities,
    persister,
  );
  const relationships = createRelationshipsOperations(
    oldData.relationships,
    newData.relationships,
    persister,
  );

  return await persister.publishPersisterOperations([entities, relationships]);
}

function createEntitiesOperations(
  oldData: JupiterOneEntitiesData,
  newData: JupiterOneEntitiesData,
  persister: PersisterClient,
): EntityOperation[] {
  const defatultOperations: EntityOperation[] = [];
  const entities: EntitiesKeys[] = Object.keys(oldData) as EntitiesKeys[];

  return entities.reduce((operations, entityName) => {
    const oldEntities = oldData[entityName];
    const newEntities = newData[entityName];

    return [
      ...operations,
      ...persister.processEntities<EntityFromIntegration>({
        oldEntities,
        newEntities,
      }),
    ];
  }, defatultOperations);
}

function createRelationshipsOperations(
  oldData: JupiterOneRelationshipsData,
  newData: JupiterOneRelationshipsData,
  persister: PersisterClient,
): RelationshipOperation[] {
  const defatultOperations: RelationshipOperation[] = [];
  const relationships: RelationshipsKeys[] = Object.keys(
    oldData,
  ) as RelationshipsKeys[];

  return relationships.reduce((operations, relationshipName) => {
    const oldRelationships = oldData[relationshipName];
    const newRelationships = newData[relationshipName];

    return [
      ...operations,
      ...persister.processRelationships({ oldRelationships, newRelationships }),
    ];
  }, defatultOperations);
}

export function convert(
  oneLoginDataModel: OneLoginDataModel,
  account: Account,
): JupiterOneDataModel {
  return {
    entities: convertEntities(oneLoginDataModel, account),
    relationships: convertRelationships(oneLoginDataModel, account),
  };
}

export function convertEntities(
  oneLoginDataModel: OneLoginDataModel,
  account: Account,
): JupiterOneEntitiesData {
  return {
    accounts: [createAccountEntity(account)],
    apps: createAppEntities(oneLoginDataModel.apps),
    groups: createGroupEntities(oneLoginDataModel.groups),
    users: createUserEntities(oneLoginDataModel.users),
    personalApps: createPersonalAppEntities(oneLoginDataModel.personalApps),
    roles: createRoleEntities(oneLoginDataModel.roles),
    devices: createPersonalDeviceEntities(oneLoginDataModel.personalDevices),
    services: getServiceEntities(account.name),
  };
}

export function convertRelationships(
  oneLoginDataModel: OneLoginDataModel,
  account: Account,
): JupiterOneRelationshipsData {
  return {
    userGroupRelationships: createUserGroupRelationships(
      oneLoginDataModel.users,
    ),
    userRoleRelationships: createUserRoleRelationships(
      oneLoginDataModel.users,
      oneLoginDataModel.roles,
    ),
    userAppRelationships: createUserAppRelationships(
      oneLoginDataModel.personalApps,
    ),
    userPersonalAppRelationships: createUserPersonalAppRelationships(
      oneLoginDataModel.personalApps,
    ),
    userPersonalDeviceRelationships: createUserPersonalDeviceRelationships(
      oneLoginDataModel.personalDevices,
    ),
    accountAppRelationships: createAccountAppRelationships(
      oneLoginDataModel.apps,
      account,
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
    accountPersonalDeviceRelationships: createAccountPersonalDeviceRelationships(
      oneLoginDataModel.personalDevices,
      account,
    ),
    accountServiceRelationships: createAccountServiceRelationships(
      getServiceEntities(account.name),
      account,
    ),
  };
}
