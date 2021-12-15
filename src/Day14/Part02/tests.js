import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When expanding the polymer template for 40 steps", async () =>
  {
    it("should return 2188189693529 as the result for the test input", async () =>
    {
      const input = "/Day14/test-input.txt";
      assertEquals(await fn(input), 2188189693529);
    });
  });
}