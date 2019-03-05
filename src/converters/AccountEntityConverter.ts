import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
} from "../jupiterone";
import { Account } from "../onelogin/OneLoginClient";

export function generateAccountKey(id?: string) {
  return `onelogin-account-key-${id}`;
}

export function createAccountEntity(account: Account): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: generateAccountKey(account.id),
    _type: ACCOUNT_ENTITY_TYPE,
    displayName: account.name,
    name: account.name,
  };
}
