import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface UserPersonalDeviceRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const USER_PERSONAL_DEVICE_RELATIONSHIP_TYPE =
  "onelogin_user_assigned_mfa_device";
export const USER_PERSONAL_DEVICE_RELATIONSHIP_CLASS = "ASSIGNED";
