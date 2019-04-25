import {
  GraphClient,
  IntegrationExecutionContext,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";

import OneLoginClien from "./onelogin/OneLoginClient";

export interface OneLoginExecutionContext extends IntegrationExecutionContext {
  graph: GraphClient;
  persister: PersisterClient;
  provider: OneLoginClien;
}
