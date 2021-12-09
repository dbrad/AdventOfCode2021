import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("Counting the number of low points in a map", async () =>
  {
    it("should return 15 as the total threat level of the test map", async () =>
    {
      const input = "/Day09/test-input.txt";
      assertEquals(await fn(input), 15);
    });
  });
}