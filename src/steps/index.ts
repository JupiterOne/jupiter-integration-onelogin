import { accountSteps } from './account';
import { applicationSteps } from './applications';
import { groupSteps } from './groups';
import { roleSteps } from './roles';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...groupSteps,
  ...roleSteps,
  ...userSteps,
  ...applicationSteps,
];

export { integrationSteps };
