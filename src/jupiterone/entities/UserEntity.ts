import { EntityFromIntegration } from "@jupiterone/jupiter-managed-integration-sdk";

export const USER_ENTITY_TYPE = "onelogin_user";
export const USER_ENTITY_CLASS = "User";

export interface UserEntity extends EntityFromIntegration {
  id: number;
  displayName: string;
  activatedAt: string | null;
  createdAt: string;
  email: string;
  username: string | null;
  firstname: string;
  groupId: number;
  invalidLoginAttempts: number | null;
  invitationSentAt: string | null;
  lastLogin: string | null;
  lastname: string;
  lockedUntil: string | null;
  comment: string | null;
  openidName: string;
  localeCode: string | null;
  preferredLocaleCode: string | null;
  passwordChangedAt: string | null;
  phone: string | null;
  status: number;
  updatedAt: string;
  distinguishedName: string | null;
  externalId: number | null;
  directoryId: number | null;
  memberOf: string | null;
  samaccountname: string | null;
  userprincipalname: string | null;
  managerAdId: number | null;
  managerUserId: number | null;
  company: string | null;
  department: string | null;
  title: string | null;
  state: number;
  trustedIdpId: number | null;
}
