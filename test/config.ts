import * as dotenv from "dotenv";
import * as path from "path";

import { IntegrationConfig } from "../src/types";

/**
 * Recording tests require valid credentials loaded from `.env`. Record new tests as follows:
 *
 * > LOAD_ENV=1 yarn test
 */
if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, "../.env"),
  });
}

export const testConfig: IntegrationConfig = {
  clientId: process.env.CLIENT_ID || "clientId",
  clientSecret: process.env.CLIENT_SECRET || "clientSecret",
  orgUrl: process.env.ORG_URL || "orgUrl",
};
