import { Account } from "./OneLoginClient";

import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
} from "./types";

export function createAccountEntity(data: Account): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: `onelogin-account-${data.id}`,
    _type: ACCOUNT_ENTITY_TYPE,
    accountId: data.id,
    displayName: data.name,
  };
}
