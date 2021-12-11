import { assertEquals, describe, it } from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When counting octopus flashes over 100 steps", async () =>
  {
    it("should return 1656 as the total for the test input.", async () =>
    {
      const input = [
        "5483143223",
        "2745854711",
        "5264556173",
        "6141336146",
        "6357385478",
        "4167524645",
        "2176841721",
        "6882881134",
        "4846848554",
        "5283751526",
      ];
      assertEquals(await fn(input), 1656);
    });
  });
}