import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export type AccountPersonalDeviceRelationship = RelationshipFromIntegration;

export const ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_TYPE =
  "onelogin_account_has_mfa_device";
export const ACCOUNT_PERSONAL_DEVICE_RELATIONSHIP_CLASS = "HAS";
