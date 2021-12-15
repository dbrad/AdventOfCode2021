import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When testing a test", async () =>
  {
    it("should finish running and output a capital O", async () =>
    {
      const input = "/Day13/test-input.txt";
      assertEquals(await fn(input), 0);
    });
  });
}