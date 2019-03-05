import { User } from "../onelogin/OneLoginClient";

import {
  USER_GROUP_RELATIONSHIP_CLASS,
  USER_GROUP_RELATIONSHIP_TYPE,
  UserGroupRelationship,
} from "../jupiterone";

import { generateGroupKey } from "./GroupEntityConverter";
import { generateUserKey } from "./UserEntityConverter";

export function createUserGroupRelationships(users: User[]) {
  const defaultValue: UserGroupRelationship[] = [];

  return users.reduce((acc, user) => {
    if (!user.group_id) {
      return acc;
    }

    const parentKey = generateGroupKey(user.group_id);
    const childKey = generateUserKey(user.id);

    const relationship: UserGroupRelationship = {
      _class: USER_GROUP_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: `${parentKey}_has_${childKey}`,
      _type: USER_GROUP_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
