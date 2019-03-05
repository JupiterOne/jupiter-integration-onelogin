import fetch, { RequestInit } from "node-fetch";

interface OneloginResponse {
  status: {
    error: boolean;
    code: number;
    type: string;
    message: string;
  };

  pagination: {
    before_cursor: string | null;
    after_cursor: string | null;
    previous_link: string | null;
    next_link: string | null;
  };
}

interface AccessToken {
  access_token: string;
  created_at: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  account_id: number;
}

export interface Account {
  id: string;
  name: string;
}

export interface User {
  activated_at: string;
  created_at: string;
  email: string;
  username: string;
  firstname: string;
  group_id: number;
  id: number;
  invalid_login_attempts: number;
  invitation_sent_at: string;
  last_login: string;
  lastname: string;
  locked_until: string;
  comment: string;
  openid_name: string;
  locale_code: string;
  preferred_locale_code: string;
  password_changed_at: string;
  phone: string;
  status: number;
  updated_at: string;
  distinguished_name: string;
  external_id: number;
  directory_id: number;
  member_of: string | null;
  samaccountname: string | null;
  userprincipalname: null;
  manager_ad_id: null;
  manager_user_id: null;
  role_id: number[];
  company: string;
  department: string;
  title: string;
  state: number;
  trusted_idp_id: number;
}

export interface Group {
  id: number;
  name: string;
  reference?: string;
}

export interface Role {
  id: number;
  name: string;
}

interface AccessTokenResponse extends OneloginResponse {
  data: AccessToken[];
}

interface UserResponse extends OneloginResponse {
  data: User[];
}

interface GroupResponse extends OneloginResponse {
  data: Group[];
}

interface RoleResponse extends OneloginResponse {
  data: Role[];
}

export interface OneLoginDataModel {
  groups: Group[];
  users: User[];
  roles: Role[];
  accountName?: string;
}

enum Method {
  GET = "get",
  POST = "post",
}

export default class OneLoginClient {
  private host: string = "https://api.us.onelogin.com";
  private clientId: string;
  private clientSecret: string;
  private accessToken: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  public async authenticate() {
    const result = (await this.makeRequest(
      "/auth/oauth2/token",
      Method.POST,
      { grant_type: "client_credentials" },
      {
        Authorization: `client_id:${this.clientId}, client_secret:${
          this.clientSecret
        }`,
      },
    )) as AccessTokenResponse;

    if (result.data) {
      const data = result.data.pop();

      if (data) {
        this.accessToken = data.access_token;
        return;
      }
    }

    throw new Error(result.status.message);
  }

  public async fetchUsers(): Promise<User[]> {
    let users: User[] = [];
    let afterCursor: string | null = "";

    do {
      const result = (await this.makeRequest(
        `/api/1/users?after_cursor=${afterCursor}`,
        Method.GET,
        {},
        { Authorization: `bearer:${this.accessToken}` },
      )) as UserResponse;

      if (result.data) {
        users = [...users, ...result.data];
        afterCursor = result.pagination.after_cursor;
      }
    } while (afterCursor);

    return users;
  }

  public async fetchGroups(): Promise<Group[]> {
    let groups: Group[] = [];
    let afterCursor: string | null = "";

    do {
      const result = (await this.makeRequest(
        "/api/1/groups",
        Method.GET,
        {},
        { Authorization: `bearer:${this.accessToken}` },
      )) as GroupResponse;

      if (result.data) {
        groups = [...groups, ...result.data];
        afterCursor = result.pagination.after_cursor;
      }
    } while (afterCursor);

    return groups;
  }

  public async fetchRoles(): Promise<Role[]> {
    let roles: Role[] = [];
    let afterCursor: string | null = "";

    do {
      const result = (await this.makeRequest(
        "/api/1/roles",
        Method.GET,
        {},
        { Authorization: `bearer:${this.accessToken}` },
      )) as RoleResponse;

      if (result.data) {
        roles = [...roles, ...result.data];
        afterCursor = result.pagination.after_cursor;
      }
    } while (afterCursor);

    return roles;
  }

  private async makeRequest(
    url: string,
    method: Method,
    params: {},
    headers: {},
  ): Promise<
    AccessTokenResponse | GroupResponse | UserResponse | RoleResponse
  > {
    let options: RequestInit = {
      method,
      headers: {
        "Content-type": "application/json",
        ...headers,
      },
    };

    if (method === Method.POST) {
      options = { ...options, body: JSON.stringify(params) };
    }

    const response = await fetch(this.host + url, options);

    return response.json();
  }
}
