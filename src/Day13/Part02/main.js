import {log} from "../../app.js";

export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const [coordinatesRaw, foldsRaw] = inputText.split("\n\n");
  const coordinates = coordinatesRaw
    .split("\n")
    .map(str =>
    {
      let [xString, yString] = str.split(",");
      return {x: Number(xString), y: Number(yString)};
    });

  const folds = foldsRaw
    .split("\n")
    .map(foldInstruction => foldInstruction.split(" ")[2])
    .map(foldCoordinate =>
    {
      let [axis, value] = foldCoordinate.split("=");
      return {axis: axis, value: Number(value)};
    });

  let maxX = 0;
  let maxY = 0;
  let grid = [];

  for (let {x, y} of coordinates)
  {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  for (let {x, y} of coordinates)
  {
    grid[x + y * (maxX + 1)] = true;
  }

  let xBound = maxX;
  let yBound = maxY;
  for (let fold of folds)
  {
    let xStart = fold.axis === "x" ? fold.value : 0;
    let yStart = fold.axis === "y" ? fold.value : 0;

    let xOffset = 0;
    for (let x = xStart; x <= xBound; x++)
    {
      let yOffset = 0;
      for (let y = yStart; y <= yBound; y++)
      {
        let foldFrom = x + (y * (maxX + 1));
        let foldTo = fold.axis === "x"
          ? (xStart - xOffset) + (y * (maxX + 1))
          : x + ((yStart - yOffset) * (maxX + 1));

        grid[foldTo] = (grid[foldTo] || false) || (grid[foldFrom] || false);
        yOffset++;
      }
      xOffset++;
    }

    if (fold.axis === "x")
    {
      xBound = fold.value - 1;
    }
    else
    {
      yBound = fold.value - 1;
    }
  }

  printGrid(grid, maxX, xBound, yBound);

  return 0;
}

function printGrid(grid, maxX, xBound, yBound)
{
  for (let y = 0; y <= yBound; y++)
  {
    let lineStr = "";
    for (let x = 0; x <= xBound; x++)
    {
      if (grid[x + y * (maxX + 1)])
        lineStr += "█";
      else
        lineStr += "&nbsp;";
    }
    log(lineStr);
  }
}