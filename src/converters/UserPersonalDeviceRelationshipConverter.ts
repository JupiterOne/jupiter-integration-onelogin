import {
  PersonalDevice,
  PersonalDevicesDict,
} from "../onelogin/OneLoginClient";

import {
  PERSONAL_DEVICE_ENTITY_TYPE,
  USER_ENTITY_TYPE,
  USER_PERSONAL_DEVICE_RELATIONSHIP_CLASS,
  USER_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
  UserPersonalDeviceRelationship,
} from "../jupiterone";

import generateKey from "../utils/generateKey";

export function createUserPersonalDeviceRelationships(
  personalDevices: PersonalDevicesDict,
) {
  const defaultValue: UserPersonalDeviceRelationship[] = [];

  const deviceOwners = Object.keys(personalDevices);

  return (
    deviceOwners &&
    deviceOwners.reduce((acc, strId) => {
      const userId = parseInt(strId, 10);
      const devicesArray = personalDevices[userId];

      const relationships =
        devicesArray &&
        devicesArray.reduce((userDevicesAcc, device: PersonalDevice) => {
          const parentKey = generateKey(USER_ENTITY_TYPE, userId);
          const childKey = generateKey(PERSONAL_DEVICE_ENTITY_TYPE, device.id);

          const relationship: UserPersonalDeviceRelationship = {
            _class: USER_PERSONAL_DEVICE_RELATIONSHIP_CLASS,
            _fromEntityKey: parentKey,
            _key: `${parentKey}_assigned_${childKey}`,
            _type: USER_PERSONAL_DEVICE_RELATIONSHIP_TYPE,
            _toEntityKey: childKey,
            displayName: "ASSIGNED",
          };

          return [...userDevicesAcc, relationship];
        }, defaultValue);

      return acc.concat(relationships);
    }, defaultValue)
  );
}
