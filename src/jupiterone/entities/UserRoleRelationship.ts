import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface UserRoleRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const USER_ROLE_RELATIONSHIP_TYPE = "onelogin_user_assigned_role";
export const USER_ROLE_RELATIONSHIP_CLASS = "ASSIGNED";
