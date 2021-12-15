import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When testing the first fold of paper", async () =>
  {
    it("should return 17 as the number of dots for the test input", async () =>
    {
      const input = "/Day13/test-input.txt";
      assertEquals(await fn(input), 17);
    });
  });
}