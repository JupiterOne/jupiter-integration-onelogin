import { ROLE_ENTITY_CLASS, ROLE_ENTITY_TYPE, RoleEntity } from "../jupiterone";
import { Role } from "../onelogin/OneLoginClient";

export function generateRoleKey(id?: number) {
  return `onelogin-role-key-${id}`;
}

export function createRoleEntities(data: Role[]): RoleEntity[] {
  return data.map(role => {
    return {
      _class: ROLE_ENTITY_CLASS,
      _key: generateRoleKey(role.id),
      _type: ROLE_ENTITY_TYPE,
      id: role.id,
      displayName: role.name,
      name: role.name,
    };
  });
}
