import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When finding the optimal position for the carb submarines", async () =>
  {
    it("should return 168 fuel as the lowest fuel cost", async () =>
    {
      const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
      assertEquals(await fn(input), 168);
    });
  });
}