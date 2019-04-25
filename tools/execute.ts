/* tslint:disable:no-console */
import { executeIntegrationLocal } from "@jupiterone/jupiter-managed-integration-sdk";
import invocationConfig from "../src/index";

const integrationConfig = {
  clientId: process.env.ONELOGIN_LOCAL_EXECUTION_CLIENT_ID,
  clientSecret: process.env.ONELOGIN_LOCAL_EXECUTION_CLIENT_SECRET,
  accountName: process.env.ONELOGIN_LOCAL_EXECUTION_ACCOUNT_NAME,
};

const invocationArgs = {
  // providerPrivateKey: process.env.PROVIDER_LOCAL_EXECUTION_PRIVATE_KEY
};

executeIntegrationLocal(
  integrationConfig,
  invocationConfig,
  invocationArgs,
).catch(err => {
  console.error(err);
  process.exit(1);
});
