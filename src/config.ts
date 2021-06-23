import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  clientId: {
    type: 'string',
  },
  clientSecret: {
    type: 'string',
    mask: true,
  },
  orgUrl: {
    type: 'string',
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The Onelogin client ID used to authenticate requests.
   */
  clientId: string;

  /**
   * The Onelogin client secret used to authenticate requests.
   */
  clientSecret: string;

  /**
   * The Onelogin organization URL. Only used to create a weblink to the account.
   */
  orgUrl: string;

  /**
   * The Onelogin account name. Optional. Used to create name of account entity in J1 graph.
   */
  accountName?: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.clientId || !config.clientSecret) {
    throw new IntegrationValidationError(
      'Config requires all of {clientId, clientSecret}',
    );
  }

  //checks for orgUrl
  if (/https?:\/\//.test(config.orgUrl)) {
    throw new IntegrationValidationError(
      'Config {orgUrl} should not have https:// prepended',
    );
  }

  const splitter = config.orgUrl.split('.');
  if (!(splitter[1] === 'onelogin')) {
    throw new IntegrationValidationError(
      'Problem with config {orgUrl}. Should be {YOURDOMAIN}.onelogin.com',
    );
  }

  const apiClient = createAPIClient(config, context.logger);
  await apiClient.verifyAuthentication();
}
