import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export type AccountServiceRelationship = RelationshipFromIntegration;

export const ACCOUNT_SERVICE_RELATIONSHIP_TYPE =
  "onelogin_account_has_onelogin_service";
export const ACCOUNT_SERVICE_RELATIONSHIP_CLASS = "HAS";
