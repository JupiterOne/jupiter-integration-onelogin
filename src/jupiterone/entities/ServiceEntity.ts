import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const SERVICE_ENTITY_CLASS = ["Service", "Control"];
export const SERVICE_ENTITY_TYPE = "onelogin_service";

export interface ServiceEntity extends EntityFromIntegration {
  name: string;
  category: string;
  function: string;
  controlDomain: string;
}
