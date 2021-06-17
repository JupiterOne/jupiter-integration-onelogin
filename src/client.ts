//const jwtDecode = require('jwt-decode');

import {
  IntegrationLogger,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import { OneLoginClient, User, Group, Role, App } from './onelogin';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  provider: OneLoginClient;
  //retrieves a token automatically and applies it to subsequent requests
  //token expiration is configured on the auth0 site; default is 24 hours
  constructor(readonly config: IntegrationConfig, logger: IntegrationLogger) {
    this.provider = new OneLoginClient(
      config.clientId,
      config.clientSecret,
      logger,
    );
  }

  public async verifyAuthentication(): Promise<void> {
    //lightweight authen check
    try {
      await this.provider.authenticate();
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: this.config.domain,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  /**
   * Iterates each Onelogin group resource.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateGroups(iteratee: ResourceIteratee<Group>): Promise<void> {
    await this.provider.authenticate();
    const groups = await this.provider.fetchGroups();
    for (const group of groups) {
      await iteratee(group);
    }
  }

  /**
   * Iterates each Onelogin group resource.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateRoles(iteratee: ResourceIteratee<Role>): Promise<void> {
    await this.provider.authenticate();
    const roles = await this.provider.fetchRoles();
    for (const role of roles) {
      await iteratee(role);
    }
  }

  /**
   * Iterates each Onelogin user resource.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUsers(iteratee: ResourceIteratee<User>): Promise<void> {
    await this.provider.authenticate();
    const users = await this.provider.fetchUsers();
    for (const user of users) {
      await iteratee(user);
    }
  }
}

export function createAPIClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): APIClient {
  return new APIClient(config, logger);
}
