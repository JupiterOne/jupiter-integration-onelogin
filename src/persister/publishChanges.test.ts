import { createTestIntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";
import { readFileSync } from "fs";
import initializeContext from "../initializeContext";
import fetchOneLoginData from "../onelogin/fetchOneLoginData";
import { convert } from "./publishChanges";

function readFixture(fixtureName: string) {
  const raw = readFileSync(
    `${__dirname}/../../test/fixtures/${fixtureName}.json`,
  );
  return JSON.parse(raw.toString());
}

jest.mock("node-fetch", () => {
  return jest.fn().mockImplementation((url: string) => {
    const endpointName = url.split("/").pop();

    return {
      json() {
        return readFixture(
          (endpointName && endpointName.split("?").shift()) || "",
        );
      },
    };
  });
});

test("convert", async () => {
  const options = {
    instance: {
      config: {
        clientId: "fakeClientId",
        clientSecret: "fakeClientSecret",
      },
      id: "account-xxx",
      name: "test-name",
    },
  };

  const context = createTestIntegrationExecutionContext(options);
  const { provider, account } = await initializeContext(context);

  const oneLoginData = await fetchOneLoginData(provider);
  const newData = convert(oneLoginData, account);

  expect(newData).toEqual(readFixture("result"));
});
