export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const inputLines = inputText.split(/\r?\n/);

  const heightMapWidth = inputLines[0].length;
  const heightMapHeight = inputLines.length;

  const flatHeightMap = inputLines.join("").split("").map(str => parseInt(str, 10));
  let lowPoints = [];

  for (let index = 0, mapLength = flatHeightMap.length; index < mapLength; index++)
  {
    let currentValue = flatHeightMap[index];
    let x = index % heightMapWidth;
    let y = Math.floor(index / heightMapWidth);
    let hasLowerNeighbour = false;
    if (x > 0 && flatHeightMap[index - 1] <= currentValue)
      hasLowerNeighbour = true;
    if (x < heightMapWidth - 1 && flatHeightMap[index + 1] <= currentValue)
      hasLowerNeighbour = true;
    if (y > 0 && flatHeightMap[index - heightMapWidth] <= currentValue)
      hasLowerNeighbour = true;
    if (y < heightMapHeight - 1 && flatHeightMap[index + heightMapWidth] <= currentValue)
      hasLowerNeighbour = true;

    if (!hasLowerNeighbour)
      lowPoints.push(currentValue);
  }

  let sum = 0;
  for (let lowPoint of lowPoints)
    sum += lowPoint + 1;

  return sum;
}