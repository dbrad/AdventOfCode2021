import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When counting angler fish over 80 generations", async () =>
  {
    it("should return a total of 5934 with the test input.", async () =>
    {
      const input = [3, 4, 3, 1, 2];
      assertEquals(await fn(input), 5934);
    });
  });
}