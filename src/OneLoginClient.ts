export interface Account {
  id: string;
  name: string;
}

export default class OneLoginClient {
  public async fetchAccountDetails(): Promise<Account> {
    return {
      id: "account-a",
      name: "Account A",
    };
  }
}
