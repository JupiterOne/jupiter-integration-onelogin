import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface UserPersonalAppRelationship
  extends RelationshipFromIntegration {
  id?: number;
}

export const USER_PERSONAL_APP_RELATIONSHIP_TYPE =
  "onelogin_user_has_onelogin_personal_application";
export const USER_PERSONAL_APP_RELATIONSHIP_CLASS = "HAS";
