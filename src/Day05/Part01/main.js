export default async function (input)
{
  let lineSegments = input.map(rawInputLine => rawInputLine.split(" -> ").map(rawCoordStrings => rawCoordStrings.split(",").map(numberString => Number(numberString))));

  let ventMap = [];

  let maxX = 0;

  for (let lineSegment of lineSegments)
  {
    let x1 = lineSegment[0][0];
    let x2 = lineSegment[1][0];

    if (x1 > maxX)
      maxX = x1;
    if (x2 > maxX)
      maxX = x2;
  }

  for (let lineSegment of lineSegments)
  {
    let x1 = lineSegment[0][0];
    let y1 = lineSegment[0][1];
    let x2 = lineSegment[1][0];
    let y2 = lineSegment[1][1];

    let xDirection = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
    let yDirection = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
    if (xDirection !== 0 && yDirection !== 0) continue;
    let x = x1;
    let y = y1;
    while (x != x2 + xDirection || y != y2 + yDirection)
    {
      let index = x + y * maxX;
      ventMap[index] = (ventMap[index] || 0) + 1;
      x += xDirection;
      y += yDirection;
    }
  }

  let result = 0;
  for (let position of ventMap)
  {
    if (position >= 2) result++;
  }
  return result;
}