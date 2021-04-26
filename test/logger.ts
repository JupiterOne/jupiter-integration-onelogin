import { IntegrationLogger } from "@jupiterone/jupiter-managed-integration-sdk";

function noop() {
  // pass
}

export function createMockIntegrationLogger(): IntegrationLogger {
  return {
    child: () => createMockIntegrationLogger(),
    info: noop,
    trace: noop,
    warn: noop,
    debug: noop,
    error: noop,
    fatal: noop,
  };
}
