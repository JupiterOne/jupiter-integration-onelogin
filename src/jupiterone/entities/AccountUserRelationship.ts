import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface AccountUserRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const ACCOUNT_USER_RELATIONSHIP_TYPE = "onelogin_account_user";
export const ACCOUNT_USER_RELATIONSHIP_CLASS = "HAS";
