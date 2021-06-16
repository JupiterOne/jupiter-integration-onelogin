import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_SERVICE_RELATIONSHIP_CLASS,
  ACCOUNT_SERVICE_RELATIONSHIP_TYPE,
  ServiceEntity,
} from '../jupiterone';
import { Account } from '../onelogin/OneLoginClient';
import generateKey from '../utils/generateKey';

export function createAccountServiceRelationships(
  services: ServiceEntity[],
  account: Account,
): AccountServiceRelationship[] {
  return services.map((service) => {
    const parentKey = generateKey(ACCOUNT_ENTITY_TYPE, account.id);
    const childKey = service._key;

    const relationship: AccountServiceRelationship = {
      _class: ACCOUNT_SERVICE_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: `${parentKey}_has_${childKey}`,
      _type: ACCOUNT_SERVICE_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return relationship;
  });
}
