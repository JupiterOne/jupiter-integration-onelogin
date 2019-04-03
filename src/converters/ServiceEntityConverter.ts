import {
  SERVICE_ENTITY_CLASS,
  SERVICE_ENTITY_TYPE,
  StandardizedOneloginServiceEntity,
} from "../jupiterone";

export function getStandardizedServiceEntities(
  oneloginAccountInfoName: string,
): StandardizedOneloginServiceEntity[] {
  const ssoService: StandardizedOneloginServiceEntity = {
    _type: SERVICE_ENTITY_TYPE,
    _key: `onelogin:sso:${oneloginAccountInfoName}`,
    _class: SERVICE_ENTITY_CLASS,
    name: "SSO",
    displayName: "Onelogin SSO",
    category: "security",
    function: "sso",
    controlDomain: "identity-access",
  };

  const mfaService: StandardizedOneloginServiceEntity = {
    _type: SERVICE_ENTITY_TYPE,
    _key: `onelogin:mfa:${oneloginAccountInfoName}`,
    _class: SERVICE_ENTITY_CLASS,
    name: "MFA",
    displayName: "Onelogin MFA",
    category: "security",
    function: "mfa",
    controlDomain: "identity-access",
  };

  return [ssoService, mfaService];
}
