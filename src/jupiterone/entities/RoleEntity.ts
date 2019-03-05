import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const ROLE_ENTITY_TYPE = "onelogin_role";
export const ROLE_ENTITY_CLASS = "AccessRole";

export interface RoleEntity extends EntityFromIntegration {
  id: number;
  name: string;
}
