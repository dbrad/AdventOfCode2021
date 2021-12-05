import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("Scanning for thermal vents", async () =>
  {
    it("should return 12 points of 2 or larger for the test input", async () =>
    {
      const input = [
        "0,9 -> 5,9",
        "8,0 -> 0,8",
        "9,4 -> 3,4",
        "2,2 -> 2,1",
        "7,0 -> 7,4",
        "6,4 -> 2,0",
        "0,9 -> 2,9",
        "3,4 -> 1,4",
        "0,0 -> 8,8",
        "5,5 -> 8,2",
      ];
      assertEquals(await fn(input), 12);
    });
  });
}