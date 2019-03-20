import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface UserAppRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const USER_APP_RELATIONSHIP_TYPE = "onelogin_user_assigned_app";
export const USER_APP_RELATIONSHIP_CLASS = "ASSIGNED";
