import { Role, User } from '../onelogin/OneLoginClient';

import {
  ROLE_ENTITY_TYPE,
  USER_ENTITY_TYPE,
  USER_ROLE_RELATIONSHIP_CLASS,
  USER_ROLE_RELATIONSHIP_TYPE,
} from '../jupiterone';

import generateKey from '../utils/generateKey';

interface RolesDict {
  [id: number]: Role;
}

export function createUserRoleRelationships(users: User[], roles: Role[]) {
  const defaultValue: UserRoleRelationship[] = [];
  const rolesDict: RolesDict = {};

  roles.forEach((role: Role) => {
    rolesDict[role.id] = role;
  });

  return users.reduce((acc, user) => {
    if (!user.role_id) {
      return acc;
    }

    const relationships = user.role_id.reduce(
      (userRolesAcc, roleId: number) => {
        const parentKey = generateKey(USER_ENTITY_TYPE, user.id);
        const childKey = generateKey(ROLE_ENTITY_TYPE, roleId);

        const relationship: UserRoleRelationship = {
          _class: USER_ROLE_RELATIONSHIP_CLASS,
          _fromEntityKey: parentKey,
          _key: `${parentKey}_assigned_${childKey}`,
          _type: USER_ROLE_RELATIONSHIP_TYPE,
          _toEntityKey: childKey,
        };

        return [...userRolesAcc, relationship];
      },
      defaultValue,
    );

    return [...acc, ...relationships];
  }, defaultValue);
}
