import { Role, User } from "../onelogin/OneLoginClient";

import {
  USER_ROLE_RELATIONSHIP_CLASS,
  USER_ROLE_RELATIONSHIP_TYPE,
  UserRoleRelationship,
} from "../jupiterone";

import { generateRoleId } from "./RoleEntityConverter";
import { generateUserId } from "./UserEntityConverter";

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
        const parentId = generateUserId(user.id);
        const childId = generateRoleId(roleId);

        const relationship: UserRoleRelationship = {
          _class: USER_ROLE_RELATIONSHIP_CLASS,
          _fromEntityKey: parentId,
          _key: `${parentId}_has_${childId}`,
          _type: USER_ROLE_RELATIONSHIP_TYPE,
          _toEntityKey: childId,
        };

        return [...userRolesAcc, relationship];
      },
      defaultValue,
    );

    return [...acc, ...relationships];
  }, defaultValue);
}
