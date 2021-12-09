import {log} from "../../app.js";

export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const inputLines = inputText.split("\n");

  const heightMapWidth = inputLines[0].length;
  const heightMapHeight = inputLines.length;

  const flatHeightMap = inputLines.join("").split("").map(str => parseInt(str, 10));
  let lowPointIndexes = [];

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
    {
      lowPointIndexes.push(index);
      flatHeightMap[index] = -1;
    }
  }

  let basinSizes = [];
  for (let lowPointIndex of lowPointIndexes)
  {
    let basinSize = 1;
    let workList = [lowPointIndex];
    while (workList.length > 0)
    {
      let index = workList.pop();
      let x = index % heightMapWidth;
      let y = Math.floor(index / heightMapWidth);

      let leftIndex = index - 1;
      let leftValue = flatHeightMap[leftIndex];
      if (x > 0 && leftValue < 9 && leftValue > -1)
      {
        flatHeightMap[leftIndex] = -1;
        workList.push(leftIndex);
        basinSize++;
      }

      let rightIndex = index + 1;
      let rightValue = flatHeightMap[rightIndex];
      if (x < heightMapWidth - 1 && rightValue < 9 && rightValue > -1)
      {
        flatHeightMap[rightIndex] = -1;
        workList.push(rightIndex);
        basinSize++;
      }

      let upIndex = index - heightMapWidth;
      let upValue = flatHeightMap[upIndex];
      if (y > 0 && upValue < 9 && upValue > -1)
      {
        flatHeightMap[upIndex] = -1;
        workList.push(upIndex);
        basinSize++;
      }

      let downIndex = index + heightMapWidth;
      let downValue = flatHeightMap[downIndex];
      if (y < heightMapHeight - 1 && downValue < 9 && downValue > -1)
      {
        flatHeightMap[downIndex] = -1;
        workList.push(downIndex);
        basinSize++;
      }
    }
    basinSizes.push(basinSize);
  }

  basinSizes = basinSizes.sort((a, b) => b - a);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}