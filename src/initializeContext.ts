import OneLoginClient from "./OneLoginClient";
import { OneLoginExecutionContext } from "./types";

import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
} from "@jupiterone/jupiter-managed-integration-sdk";

export default function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): OneLoginExecutionContext {
  return {
    ...context,
    ...context.clients.getClients(),
    onelogin: new OneLoginClient(),
  };
}
