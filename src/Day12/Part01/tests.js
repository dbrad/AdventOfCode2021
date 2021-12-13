import {assertEquals, describe, it} from "../../lib/testing.js";

import fn from "./main.js";

export default async function ()
{
  describe("When plotting all possible cave system routes", async () =>
  {
    it("should return 10, for the short test input", async () =>
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
      assertEquals(await fn(input), 10);
    });
    it("should return 19, for the medium test input", async () =>
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
      assertEquals(await fn(input), 19);
    });
    it("should return 226, for the large test input", async () =>
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
      assertEquals(await fn(input), 226);
    });
  });
}