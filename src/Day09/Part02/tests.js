import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When checking the basin sizes of the height map", async () =>
  {
    it("should return 1134 as the product of the 3 largest basin sizes", async () =>
    {
      const input = "/Day09/test-input.txt";
      assertEquals(await fn(input), 1134);
    });
  });
}