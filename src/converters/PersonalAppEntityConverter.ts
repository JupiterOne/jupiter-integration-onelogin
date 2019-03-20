import {
  PERSONAL_APP_ENTITY_CLASS,
  PERSONAL_APP_ENTITY_TYPE,
  PersonalAppEntity,
} from "../jupiterone";

import { PersonalApp, PersonalAppsDict } from "../onelogin/OneLoginClient";

import generateKey from "../utils/generateKey";

export function createPersonalAppEntities(
  data: PersonalAppsDict,
): PersonalAppEntity[] {
  const defaultValue: PersonalAppEntity[] = [];

  return Object.values(data).reduce((acc, personalApps: PersonalApp[]) => {
    const apps = personalApps
      .filter((app: PersonalApp) => app.personal)
      .map((app: PersonalApp) => ({
        _class: PERSONAL_APP_ENTITY_CLASS,
        _key: generateKey(PERSONAL_APP_ENTITY_TYPE, app.id),
        _type: PERSONAL_APP_ENTITY_TYPE,
        _icon: app.icon,
        id: app.id,
        displayName: app.name,
        icon: app.icon,
        name: app.name,
        provisioned: app.provisioned,
        extension: app.extension,
        login_id: app.login_id,
        personal: app.personal,
      }));
    return [...acc, ...apps];
  }, defaultValue);
}
