import { User } from "../onelogin/OneLoginClient";

import {
  USER_GROUP_RELATIONSHIP_CLASS,
  USER_GROUP_RELATIONSHIP_TYPE,
  UserGroupRelationship,
} from "../jupiterone";

import { generateGroupId } from "./GroupEntityConverter";
import { generateUserId } from "./UserEntityConverter";

export function createUserGroupRelationships(users: User[]) {
  const defaultValue: UserGroupRelationship[] = [];

  return users.reduce((acc, user) => {
    if (!user.group_id) {
      return acc;
    }

    const parentId = generateGroupId(user.group_id);
    const childId = generateUserId(user.id);

    const relationship: UserGroupRelationship = {
      _class: USER_GROUP_RELATIONSHIP_CLASS,
      _fromEntityKey: parentId,
      _key: `${parentId}_has_${childId}`,
      _type: USER_GROUP_RELATIONSHIP_TYPE,
      _toEntityKey: childId,
    };

    return [...acc, relationship];
  }, defaultValue);
}
