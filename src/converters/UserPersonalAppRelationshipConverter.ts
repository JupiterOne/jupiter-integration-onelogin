import { PersonalApp, PersonalAppsDict } from '../onelogin/OneLoginClient';

import {
  PERSONAL_APP_ENTITY_TYPE,
  USER_ENTITY_TYPE,
  USER_PERSONAL_APP_RELATIONSHIP_CLASS,
  USER_PERSONAL_APP_RELATIONSHIP_TYPE,
} from '../jupiterone';

import generateKey from '../utils/generateKey';

export function createUserPersonalAppRelationships(
  personalApps: PersonalAppsDict,
) {
  const defaultValue: UserRoleRelationship[] = [];

  return Object.keys(personalApps).reduce((acc, strId) => {
    const userId = parseInt(strId, 10);
    const relationships = personalApps[userId].reduce(
      (userAppsAcc, app: PersonalApp) => {
        if (!app.personal) {
          return userAppsAcc;
        }

        const parentKey = generateKey(USER_ENTITY_TYPE, userId);
        const childKey = generateKey(PERSONAL_APP_ENTITY_TYPE, app.id);

        const relationship: UserRoleRelationship = {
          _class: USER_PERSONAL_APP_RELATIONSHIP_CLASS,
          _fromEntityKey: parentKey,
          _key: `${parentKey}_has_${childKey}`,
          _type: USER_PERSONAL_APP_RELATIONSHIP_TYPE,
          _toEntityKey: childKey,
        };

        return [...userAppsAcc, relationship];
      },
      defaultValue,
    );

    return [...acc, ...relationships];
  }, defaultValue);
}
