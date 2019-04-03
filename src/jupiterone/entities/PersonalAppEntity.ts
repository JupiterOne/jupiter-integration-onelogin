import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const PERSONAL_APP_ENTITY_TYPE = "onelogin_personal_application";
export const PERSONAL_APP_ENTITY_CLASS = "Application";

export interface PersonalAppEntity extends EntityFromIntegration {
  id: number;
  name: string;
  provisioned: string;
  extension: boolean;
  login_id: number;
  personal: boolean;
}
