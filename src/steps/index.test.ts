import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';

import { IntegrationConfig } from '../config';
import { fetchUsers } from './users';
import { fetchGroups } from './groups';
import { fetchRoles } from './roles';
import { fetchApplications } from './applications';
import { fetchUserApps } from './userapps';
import { fetchUserDevices } from './userdevices';
import { fetchAccountDetails } from './account';

import { integrationConfig } from '../../test/config';
import { setupOneloginRecording } from '../../test/recording';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test('should collect data', async () => {
  recording = setupOneloginRecording({
    directory: __dirname,
    name: 'steps',
  });

  const context = createMockStepExecutionContext<IntegrationConfig>({
    instanceConfig: integrationConfig,
  });

  // Simulates dependency graph execution.
  // See https://github.com/JupiterOne/sdk/issues/262.
  await fetchAccountDetails(context);
  await fetchGroups(context);
  await fetchRoles(context);
  await fetchUsers(context);
  await fetchApplications(context);
  await fetchUserApps(context);
  await fetchUserDevices(context);

  // Review snapshot, failure is a regression
  expect({
    numCollectedEntities: context.jobState.collectedEntities.length,
    numCollectedRelationships: context.jobState.collectedRelationships.length,
    collectedEntities: context.jobState.collectedEntities,
    collectedRelationships: context.jobState.collectedRelationships,
    encounteredTypes: context.jobState.encounteredTypes,
  }).toMatchSnapshot();

  const accounts = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('Account'),
  );
  expect(accounts.length).toBeGreaterThan(0);
  expect(accounts).toMatchGraphObjectSchema({
    _class: ['Account'],
    schema: {
      additionalProperties: true,
      properties: {
        _type: { const: 'onelogin_account' },
        name: { type: 'string' },
        displayName: { type: 'string' },
        webLink: { type: 'string', format: 'url' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['name', 'displayName', 'webLink'],
    },
  });

  const users = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('User'),
  );
  expect(users.length).toBeGreaterThan(0);
  expect(users).toMatchGraphObjectSchema({
    _class: ['User'],
    schema: {
      additionalProperties: true,
      properties: {
        _type: { const: 'onelogin_user' },
        name: { type: 'string' },
        displayName: { type: 'string' },
        email: { type: 'string' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['name', 'displayName', 'email'],
    },
  });

  const appClients = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('Application'),
  );
  expect(appClients.length).toBeGreaterThan(0);
  expect(appClients).toMatchGraphObjectSchema({
    _class: ['Application'],
    schema: {
      additionalProperties: true,
      properties: {
        _type: { const: 'onelogin_application' },
        name: { type: 'string' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: [],
    },
  });
});
