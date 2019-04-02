import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const PERSONAL_DEVICE_ENTITY_TYPE = "mfa_device";
export const PERSONAL_DEVICE_ENTITY_CLASS = ["Key", "AccessKey"];

export interface PersonalDeviceEntity extends EntityFromIntegration {
  id: number;
  needs_trigger: boolean;
  default: boolean;
  active: boolean;
  auth_factor_name: string;
  type_display_name: string;
  user_display_name: string;
}
