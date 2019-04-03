import {
  ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_CLASS,
  ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
  AccountPersonalDeviceRelationship,
  PERSONAL_DEVICE_ENTITY_TYPE,
} from "../jupiterone";
import { PersonalDevicesDict } from "../onelogin/OneLoginClient";

import { ACCOUNT_ENTITY_TYPE } from "../jupiterone";

import { Account } from "../onelogin/OneLoginClient";

import generateKey from "../utils/generateKey";

export function createAccountPersonalDeviceRelationships(
  personalDevices: PersonalDevicesDict,
  account: Account,
) {
  const defaultValue: AccountPersonalDeviceRelationship[] = [];

  const deviceArrays = Object.values(personalDevices);

  const relationships = deviceArrays.reduce(
    (acc: AccountPersonalDeviceRelationship[], array) => {
      for (const device of array) {
        const parentKey = generateKey(ACCOUNT_ENTITY_TYPE, account.id);
        const childKey = generateKey(PERSONAL_DEVICE_ENTITY_TYPE, device.id);

        const relationship: AccountPersonalDeviceRelationship = {
          _class: ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_CLASS,
          _fromEntityKey: parentKey,
          _key: `${parentKey}_has_${childKey}`,
          _type: ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
          _toEntityKey: childKey,
          displayName: "HAS",
        };

        acc.push(relationship);
      }

      return acc;
    },
    defaultValue,
  );

  return relationships;
}
