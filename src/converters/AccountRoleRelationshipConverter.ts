import { Account, Role } from "../onelogin/OneLoginClient";

import {
  ACCOUNT_ROLE_RELATIONSHIP_CLASS,
  ACCOUNT_ROLE_RELATIONSHIP_TYPE,
  AccountRoleRelationship,
} from "../jupiterone";

import { generateAccountKey } from "./AccountEntityConverter";
import { generateRoleKey } from "./RoleEntityConverter";

export function createAccountRoleRelationships(
  roles: Role[],
  account: Account,
) {
  const defaultValue: AccountRoleRelationship[] = [];

  return roles.reduce((acc, role) => {
    const parentKey = generateAccountKey(account.id);
    const childKey = generateRoleKey(role.id);

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
