import {
  GROUP_ENTITY_CLASS,
  GROUP_ENTITY_TYPE,
  GroupEntity,
} from "../jupiterone";
import { Group } from "../onelogin/OneLoginClient";

export function generateGroupId(id?: number) {
  return `onelogin-group-id-${id}`;
}

export function createGroupEntities(data: Group[]): GroupEntity[] {
  return data.map(group => {
    return {
      _class: GROUP_ENTITY_CLASS,
      _key: generateGroupId(group.id),
      _type: GROUP_ENTITY_TYPE,
      id: group.id,
      displayName: group.name,
      reference: group.reference || "",
      name: group.name,
    };
  });
}
