import { Account, Role } from "../onelogin/OneLoginClient";

import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_ROLE_RELATIONSHIP_CLASS,
  ACCOUNT_ROLE_RELATIONSHIP_TYPE,
  AccountRoleRelationship,
  ROLE_ENTITY_TYPE,
} from "../jupiterone";

import generateKey from "../utils/generateKey";

export function createAccountRoleRelationships(
  roles: Role[],
  account: Account,
) {
  const defaultValue: AccountRoleRelationship[] = [];

  return roles.reduce((acc, role) => {
    const parentKey = generateKey(ACCOUNT_ENTITY_TYPE, account.id);
    const childKey = generateKey(ROLE_ENTITY_TYPE, role.id);

    const relationship: AccountRoleRelationship = {
      _class: ACCOUNT_ROLE_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: `${parentKey}_has_${childKey}`,
      _type: ACCOUNT_ROLE_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
