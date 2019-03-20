import { Account, App } from "../onelogin/OneLoginClient";

import {
  ACCOUNT_APP_RELATIONSHIP_CLASS,
  ACCOUNT_APP_RELATIONSHIP_TYPE,
  ACCOUNT_ENTITY_TYPE,
  AccountAppRelationship,
  APP_ENTITY_TYPE,
} from "../jupiterone";

import generateKey from "../utils/generateKey";

export function createAccountAppRelationships(apps: App[], account: Account) {
  const defaultValue: AccountAppRelationship[] = [];

  return apps.reduce((acc, app) => {
    const parentKey = generateKey(ACCOUNT_ENTITY_TYPE, account.id);
    const childKey = generateKey(APP_ENTITY_TYPE, app.id);

    const relationship: AccountAppRelationship = {
      _class: ACCOUNT_APP_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: `${parentKey}_has_${childKey}`,
      _type: ACCOUNT_APP_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
