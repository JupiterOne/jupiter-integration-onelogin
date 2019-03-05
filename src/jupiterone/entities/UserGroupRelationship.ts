import { RelationshipFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export interface UserGroupRelationship extends RelationshipFromIntegration {
  id?: number;
}

export const USER_GROUP_RELATIONSHIP_TYPE = "onelogin_user_group";
export const USER_GROUP_RELATIONSHIP_CLASS = "HAS";
