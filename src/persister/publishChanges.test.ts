// const { OneLoginClient, fetchOneLoginData } = jest.requireActual('../onelogin');
// const fetchOneLoginData = jest.requireActual('../onelogin/fetchOneLoginData');
import { OneLoginClient } from "../onelogin";
import fetchOneLoginData from "../onelogin/fetchOneLoginData";

import { readFileSync } from "fs";
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
  const provider = new OneLoginClient("fakeClientId", "fakeClientSecret");

  await provider.authenticate();

  const oneLoginData = await fetchOneLoginData(provider);
  const newData = convert(oneLoginData);

  expect(newData).toEqual(readFixture("result"));
});
