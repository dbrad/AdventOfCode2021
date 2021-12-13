import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When plotting all possible cave system routes", async () =>
  {
    it("should return 36, for the short test input", async () =>
    {
      const input = [
        "start-A",
        "start-b",
        "A-c",
        "A-b",
        "b-d",
        "A-end",
        "b-end",
      ];
      assertEquals(await fn(input), 36);
    });
    it("should return 103, for the medium test input", async () =>
    {
      const input = [
        "dc-end",
        "HN-start",
        "start-kj",
        "dc-start",
        "dc-HN",
        "LN-dc",
        "HN-end",
        "kj-sa",
        "kj-HN",
        "kj-dc",
      ];
      assertEquals(await fn(input), 103);
    });
    it("should return 3509, for the large test input", async () =>
    {
      const input = [
        "fs-end",
        "he-DX",
        "fs-he",
        "start-DX",
        "pj-DX",
        "end-zg",
        "zg-sl",
        "zg-pj",
        "pj-he",
        "RW-he",
        "fs-DX",
        "pj-RW",
        "zg-RW",
        "start-pj",
        "he-WI",
        "zg-he",
        "pj-fs",
        "start-RW",
      ];
      assertEquals(await fn(input), 3509);
    });
  });
}