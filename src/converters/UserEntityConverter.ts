import * as lodash from "lodash";
import { USER_ENTITY_CLASS, USER_ENTITY_TYPE, UserEntity } from "../jupiterone";
import { User } from "../onelogin/OneLoginClient";

export function generateUserKey(id?: number) {
  return `onelogin-user-key-${id}`;
}

export function createUserEntities(data: User[]): UserEntity[] {
  return data.map(user => {
    const userEntity: UserEntity = {
      _key: generateUserKey(user.id),
      _type: USER_ENTITY_TYPE,
      _class: USER_ENTITY_CLASS,
      id: user.id,
      displayName: `${user.firstname} ${user.lastname}`,
      activatedAt: user.activated_at || undefined,
      createdAt: user.created_at,
      email: user.email,
      username: user.username || "",
      firstname: user.firstname,
      groupId: user.group_id || 0,
      invalidLoginAttempts: user.invalid_login_attempts || undefined,
      invitationSentAt: user.invitation_sent_at || undefined,
      lastLogin: user.last_login || undefined,
      lastname: user.lastname,
      lockedUntil: user.locked_until || undefined,
      comment: user.comment || "",
      openidName: user.openid_name || "",
      localeCode: user.locale_code || undefined,
      preferredLocaleCode: user.preferred_locale_code || undefined,
      passwordChangedAt: user.password_changed_at || undefined,
      phone: user.phone || undefined,
      status: user.status,
      updatedAt: user.updated_at,
      distinguishedName: user.distinguished_name || undefined,
      externalId: user.external_id || undefined,
      directoryId: user.directory_id || undefined,
      memberOf: user.member_of || undefined,
      samaccountname: user.samaccountname || undefined,
      userprincipalname: user.userprincipalname || undefined,
      managerAdId: user.manager_ad_id || undefined,
      managerUserId: user.manager_user_id || undefined,
      company: user.company || undefined,
      department: user.department || undefined,
      title: user.title || undefined,
      state: user.state,
      trustedIdpId: user.trusted_idp_id || undefined,
    };

    return lodash.omitBy(
      userEntity,
      (value: any) => value === undefined,
    ) as UserEntity;
  });
}
