import OneLoginClient, {
  OneLoginDataModel,
  PersonalAppsDict,
} from "./OneLoginClient";

export default async function fetchOneLoginData(
  client: OneLoginClient,
): Promise<OneLoginDataModel> {
  const [users, groups, roles, apps] = await Promise.all([
    client.fetchUsers(),
    client.fetchGroups(),
    client.fetchRoles(),
    client.fetchApps(),
  ]);

  const personalApps: PersonalAppsDict = {};
  for (let i = 0; i < apps.length; i++) {
    personalApps[users[i].id] = await client.fetchUserApps(users[i].id);
  }

  return { users, groups, roles, apps, personalApps };
}
