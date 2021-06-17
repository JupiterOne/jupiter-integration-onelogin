import { accountSteps } from './account';
import { groupSteps } from './groups';
import { roleSteps } from './roles';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...groupSteps,
  ...roleSteps,
  ...userSteps,
];

export { integrationSteps };
