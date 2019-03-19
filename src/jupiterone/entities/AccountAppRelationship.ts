import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface AccountAppRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const ACCOUNT_APP_RELATIONSHIP_TYPE = "onelogin_account_has_app";
export const ACCOUNT_APP_RELATIONSHIP_CLASS = "HAS";
