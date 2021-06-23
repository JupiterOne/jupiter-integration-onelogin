import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
} from '../jupiterone';
import { Account } from '../onelogin/OneLoginClient';

import generateKey from '../utils/generateKey';

export function createAccountEntity(account: Account): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: generateKey(ACCOUNT_ENTITY_TYPE, account.id),
    _type: ACCOUNT_ENTITY_TYPE,
    displayName: account.name,
    name: account.name,
    webLink: 'https://' + account.orgUrl,
  };
}
