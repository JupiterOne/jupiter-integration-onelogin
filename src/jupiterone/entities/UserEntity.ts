import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const USER_ENTITY_TYPE = "onelogin_user";
export const USER_ENTITY_CLASS = "User";

export interface UserEntity extends EntityFromIntegration {
  id: number;
  displayName: string;
  activatedAt?: string;
  createdAt: string;
  email: string;
  username?: string;
  firstname: string;
  groupId: number;
  invalidLoginAttempts?: number;
  invitationSentAt?: string;
  lastLogin?: string;
  lastname: string;
  lockedUntil?: string;
  comment?: string;
  openidName: string;
  localeCode?: string;
  preferredLocaleCode?: string;
  passwordChangedAt?: string;
  phone?: string;
  status: number;
  updatedAt: string;
  distinguishedName?: string;
  externalId?: number;
  directoryId?: number;
  memberOf?: string;
  samaccountname?: string;
  userprincipalname?: string;
  managerAdId?: number;
  managerUserId?: number;
  company?: string;
  department?: string;
  title?: string;
  state: number;
  trustedIdpId?: number;
}
