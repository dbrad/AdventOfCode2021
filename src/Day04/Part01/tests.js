import { assertEquals, describe, it } from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When completing a bingo set", async () =>
  {
    it("should return a result of 4512 for the test input.", async () =>
    {
      const input = "Day04/test-input.txt";
      assertEquals(await fn(input), 4512);
    });
  });
}