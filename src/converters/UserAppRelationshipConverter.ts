import { PersonalApp, PersonalAppsDict } from "../onelogin/OneLoginClient";

import {
  APP_ENTITY_TYPE,
  USER_APP_RELATIONSHIP_CLASS,
  USER_APP_RELATIONSHIP_TYPE,
  USER_ENTITY_TYPE,
  UserAppRelationship,
} from "../jupiterone";

import generateKey from "../utils/generateKey";

export function createUserAppRelationships(personalApps: PersonalAppsDict) {
  const defaultValue: UserAppRelationship[] = [];

  return Object.keys(personalApps).reduce((acc, strId) => {
    const userId = parseInt(strId, 10);
    const relationships = personalApps[userId].reduce(
      (userAppsAcc, app: PersonalApp) => {
        if (app.personal) {
          return userAppsAcc;
        }

        const parentKey = generateKey(USER_ENTITY_TYPE, userId);
        const childKey = generateKey(APP_ENTITY_TYPE, app.id);

        const relationship: UserAppRelationship = {
          _class: USER_APP_RELATIONSHIP_CLASS,
          _fromEntityKey: parentKey,
          _key: `${parentKey}_assigned_${childKey}`,
          _type: USER_APP_RELATIONSHIP_TYPE,
          _toEntityKey: childKey,
        };

        return [...userAppsAcc, relationship];
      },
      defaultValue,
    );

    return [...acc, ...relationships];
  }, defaultValue);
}
