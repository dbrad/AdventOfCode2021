import { assertEquals, describe, it } from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When testing a test", async () =>
  {
    it("should return true", async () =>
    {
      const input = "";
      assertEquals(await fn(input), 0);
    });
  });
}