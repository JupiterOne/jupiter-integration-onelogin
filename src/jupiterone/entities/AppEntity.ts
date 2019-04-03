import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const APP_ENTITY_TYPE = "onelogin_application";
export const APP_ENTITY_CLASS = "Application";

export interface AppEntity extends EntityFromIntegration {
  id: number;
  connector_id: number;
  name: string;
  extension: boolean;
  visible: boolean;
  provisioning: boolean;
}
