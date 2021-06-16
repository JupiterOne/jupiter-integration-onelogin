import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../config';
import { createAccountEntity } from '../converters';
import { ACCOUNT_ENTITY_TYPE, ACCOUNT_ENTITY_CLASS } from '../jupiterone';

export const DATA_ACCOUNT_ENTITY = 'DATA_ACCOUNT_ENTITY';

export async function fetchAccountDetails({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const account = {
    id: instance.id,
    name: instance.config.accountName || instance.name,
    orgUrl: instance.config.orgUrl,
  };
  const accountEntity = await jobState.addEntity(createAccountEntity(account));

  await jobState.setData(DATA_ACCOUNT_ENTITY, accountEntity);
}

export const accountSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-account',
    name: 'Fetch Account Details',
    entities: [
      {
        resourceName: 'Onelogin Account',
        _type: ACCOUNT_ENTITY_TYPE,
        _class: [ACCOUNT_ENTITY_CLASS],
      },
    ],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAccountDetails,
  },
];
