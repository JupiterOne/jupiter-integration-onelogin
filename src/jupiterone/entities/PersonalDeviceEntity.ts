import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const PERSONAL_DEVICE_ENTITY_TYPE = "mfa_device";
export const PERSONAL_DEVICE_ENTITY_CLASS = ["Key", "AccessKey"];

export interface PersonalDeviceEntity extends EntityFromIntegration {
  id: number;
  needsTrigger: boolean;
  default: boolean;
  active: boolean;
  authFactorName: string;
  typeDisplayName: string;
  userDisplayName: string;
}
