import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  IntegrationMissingKeyError,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../client';
import { IntegrationConfig } from '../config';
import { createUserEntity } from '../converters';
import { DATA_ACCOUNT_ENTITY } from './account';
import {
  ACCOUNT_ENTITY_TYPE,
  GROUP_ENTITY_TYPE,
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  GROUP_USER_RELATIONSHIP_TYPE,
  USER_GROUP_RELATIONSHIP_TYPE,
  UserEntity,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE,
  IdEntityMap,
  GroupEntity,
} from '../jupiterone';

export async function fetchUsers({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(DATA_ACCOUNT_ENTITY)) as Entity;

  if (!accountEntity) {
    throw new IntegrationMissingKeyError(
      `Expected to find Account entity in jobState.`,
    );
  }

  //for use later in other steps
  const userEntities: UserEntity[] = [];

  const groupByIdMap = await jobState.getData<IdEntityMap<GroupEntity>>(
    'GROUP_BY_ID_MAP',
  );

  if (!groupByIdMap) {
    throw new IntegrationMissingKeyError(
      `Expected to find groupByIdMap in jobState.`,
    );
  }

  await apiClient.iterateUsers(async (user) => {
    const userEntity = (await jobState.addEntity(
      createUserEntity(user),
    )) as UserEntity;
    userEntities.push(userEntity);

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: userEntity,
      }),
    );

    if (user.group_id) {
      const groupEntity = groupByIdMap[String(user.group_id)];
      if (groupEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: groupEntity,
            to: userEntity,
          }),
        );

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.ASSIGNED,
            from: userEntity,
            to: groupEntity,
          }),
        );
      }
    }
  });

  await jobState.setData('USER_ARRAY', userEntities);
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: USER_ENTITY_TYPE,
        _class: [USER_ENTITY_CLASS],
      },
    ],
    relationships: [
      {
        _type: ACCOUNT_USER_RELATIONSHIP_TYPE,
        _class: RelationshipClass.HAS,
        sourceType: ACCOUNT_ENTITY_TYPE,
        targetType: USER_ENTITY_TYPE,
      },
      {
        _type: GROUP_USER_RELATIONSHIP_TYPE,
        _class: RelationshipClass.HAS,
        sourceType: GROUP_ENTITY_TYPE,
        targetType: USER_ENTITY_TYPE,
      },
      {
        _type: USER_GROUP_RELATIONSHIP_TYPE,
        _class: RelationshipClass.ASSIGNED,
        sourceType: USER_ENTITY_TYPE,
        targetType: GROUP_ENTITY_TYPE,
      },
    ],
    dependsOn: ['fetch-groups'],
    executionHandler: fetchUsers,
  },
];
