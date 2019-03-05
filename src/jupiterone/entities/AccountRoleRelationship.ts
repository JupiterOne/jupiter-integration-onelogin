import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface AccountRoleRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const ACCOUNT_ROLE_RELATIONSHIP_TYPE = "onelogin_account_role";
export const ACCOUNT_ROLE_RELATIONSHIP_CLASS = "HAS";
