import {
  IntegrationInstanceAuthenticationError,
  IntegrationInstanceConfigError,
} from "@jupiterone/jupiter-managed-integration-sdk";
import { createMockIntegrationLogger } from "../test/logger";
import invocationValidator from "./invocationValidator";

it("should reject", async () => {
  const executionContext = {
    instance: {
      config: {},
    },
  };
  try {
    await invocationValidator(executionContext as any);
  } catch (e) {
    expect(e instanceof IntegrationInstanceConfigError).toBe(true);
  }
});

it("auth error", async () => {
  const executionContext = {
    instance: {
      config: {
        clientId: "XXX",
        clientSecret: "YYY",
      },
    },
    logger: createMockIntegrationLogger(),
  };
  try {
    await invocationValidator(executionContext as any);
  } catch (e) {
    expect(e instanceof IntegrationInstanceAuthenticationError).toBe(true);
  }
});
