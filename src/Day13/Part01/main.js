import { log } from "../../app.js";

export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const [coordinatesRaw, foldsRaw] = inputText.split(/\r?\n\r?\n/);
  const coordinates = coordinatesRaw
    .split(/\r?\n/)
    .map(str =>
    {
      let [xString, yString] = str.split(",");
      return { x: Number(xString), y: Number(yString) };
    });

  const folds = foldsRaw
    .split(/\r?\n/)
    .map(foldInstruction => foldInstruction.split(" ")[2])
    .map(foldCoordinate =>
    {
      let [axis, value] = foldCoordinate.split("=");
      return { axis: axis, value: Number(value) };
    });

  let maxX = 0;
  let maxY = 0;
  let grid = [];

  for (let { x, y } of coordinates)
  {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  for (let { x, y } of coordinates)
  {
    grid[x + y * (maxX + 1)] = true;
  }

  for (let fold of [folds[0]])
  {
    let xStart = fold.axis === "x" ? fold.value : 0;
    let yStart = fold.axis === "y" ? fold.value : 0;

    for (let x = xStart; x <= maxX; x++)
    {
      for (let y = yStart; y <= maxY; y++)
      {
        let foldFrom = x + (y * (maxX + 1));
        let foldTo = fold.axis === "x"
          ? (maxX - x) + (y * (maxX + 1))
          : x + ((maxY - y) * (maxX + 1));

        grid[foldTo] ||= (grid[foldFrom] || false);
        grid[foldFrom] = false;
      }
    }
  }

  let totalPoints = 0;
  for (let x = 0; x <= maxX; x++)
  {
    for (let y = 0; y <= maxY; y++)
    {
      if (grid[x + y * (maxX + 1)]) totalPoints++;
    }
  }

  //printGrid(grid, maxX, maxY);

  return totalPoints;
}

function printGrid(grid, maxX, maxY)
{
  for (let y = 0; y <= maxY; y++)
  {
    let lineStr = "";
    for (let x = 0; x <= maxX; x++)
    {
      if (grid[x + y * (maxX + 1)])
        lineStr += "#";
      else
        lineStr += ".";
    }
    log(lineStr);
  }
}