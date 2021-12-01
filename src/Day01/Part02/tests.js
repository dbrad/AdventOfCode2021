import { assertEquals, describe, it } from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When checking for depth increases", async () =>
  {
    it("should return 5 for the example input", async () =>
    {
      const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      assertEquals(await fn(input), 5);
    });
  });
}