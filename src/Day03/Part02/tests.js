import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When calculating the gamma and epsilon rates", async () =>
  {
    it("should 230 as the power consumption for the test input.", async () =>
    {
      const input = [
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ];
      assertEquals(await fn(input), 230);
    });
  });
}