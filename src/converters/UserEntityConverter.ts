import { USER_ENTITY_CLASS, USER_ENTITY_TYPE, UserEntity } from "../jupiterone";
import { User } from "../onelogin/OneLoginClient";

export function generateUserId(id?: number) {
  return `onelogin-user-id-${id}`;
}

export function createUserEntities(data: User[]): UserEntity[] {
  return data.map(user => {
    return {
      _key: generateUserId(user.id),
      _type: USER_ENTITY_TYPE,
      _class: USER_ENTITY_CLASS,
      id: user.id,
      displayName: `${user.firstname} ${user.lastname}`,
      activatedAt: user.activated_at,
      createdAt: user.created_at,
      email: user.email,
      username: user.username || "",
      firstname: user.firstname || "",
      groupId: user.group_id || 0,
      invalidLoginAttempts: user.invalid_login_attempts,
      invitationSentAt: user.invitation_sent_at,
      lastLogin: user.last_login,
      lastname: user.lastname || "",
      lockedUntil: user.locked_until,
      comment: user.comment || "",
      openidName: user.openid_name || "",
      localeCode: user.locale_code,
      preferredLocaleCode: user.preferred_locale_code,
      passwordChangedAt: user.password_changed_at,
      phone: user.phone,
      status: user.status,
      updatedAt: user.updated_at,
      distinguishedName: user.distinguished_name,
      externalId: user.external_id,
      directoryId: user.directory_id,
      memberOf: user.member_of || "",
      samaccountname: user.samaccountname || "",
      userprincipalname: user.userprincipalname || "",
      managerAdId: user.manager_ad_id || 0,
      managerUserId: user.manager_user_id || 0,
      company: user.company,
      department: user.department,
      title: user.title,
      state: user.state,
      trustedIdpId: user.trusted_idp_id,
    };
  });
}
