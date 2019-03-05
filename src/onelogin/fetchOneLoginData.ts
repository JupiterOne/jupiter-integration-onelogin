import OneLoginClient, { OneLoginDataModel } from "./OneLoginClient";

export default async function fetchOneLoginData(
  client: OneLoginClient,
): Promise<OneLoginDataModel> {
  const [users, groups, roles] = await Promise.all([
    client.fetchUsers(),
    client.fetchGroups(),
    client.fetchRoles(),
  ]);

  return { users, groups, roles };
}
