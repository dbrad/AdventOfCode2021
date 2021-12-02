import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When following the planned course", async () =>
  {
    it("should return a result of 900 when following the test input", async () =>
    {
      const input = [
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2",
      ];
      assertEquals(await fn(input), 900);
    });
  });
}