import {log} from "../../app.js";

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let vertexPairs = input.map(str => str.split("-"));
  let currentIndex = 1;

  let labelToIndexMap = {"start": 0};
  let indexToLabelMap = ["start"];

  let start = 0;
  let end = -1;
  let edges = [[]];

  for (const [vertexALabel, vertexBLabel] of vertexPairs)
  {
    let vertexAIndex = -1;
    let vertexBIndex = -1;

    if (labelToIndexMap[vertexALabel] === undefined)
    {
      vertexAIndex = currentIndex++;
      labelToIndexMap[vertexALabel] = vertexAIndex;
      indexToLabelMap[vertexAIndex] = vertexALabel;
      edges[vertexAIndex] = [];
      if (vertexALabel === "end")
      {
        end = vertexAIndex;
      }
    }
    else
    {
      vertexAIndex = labelToIndexMap[vertexALabel];
    }

    if (labelToIndexMap[vertexBLabel] === undefined)
    {
      vertexBIndex = currentIndex++;
      labelToIndexMap[vertexBLabel] = vertexBIndex;
      indexToLabelMap[vertexBIndex] = vertexBLabel;
      edges[vertexBIndex] = [];
      if (vertexBLabel === "end")
      {
        end = vertexBIndex;
      }
    }
    else
    {
      vertexBIndex = labelToIndexMap[vertexBLabel];
    }

    edges[vertexAIndex].push(vertexBIndex);
    edges[vertexBIndex].push(vertexAIndex);
  }

  const timesVisited = [];
  for (let i = 0; i < currentIndex; i++)
    timesVisited[i] = 0;

  const depthFirstSearch = (currentVertex, endVertex, path, haveDoubleDipped = false) =>
  {
    let pathsCount = 0;
    if (currentVertex === endVertex)
    {
      return 1;
    }

    let currentVertexLabel = indexToLabelMap[currentVertex];

    let isBigCave = currentVertexLabel.toUpperCase() === currentVertexLabel;
    let isSmallCave = !isBigCave && currentVertexLabel !== "start" && currentVertexLabel !== "end";

    timesVisited[currentVertex] += 1;
    if (timesVisited[currentVertex] > 1 && isSmallCave)
    {
      haveDoubleDipped = true;
    }

    let currentVertexesEdges = edges[currentVertex];
    for (let i = 0; i < currentVertexesEdges.length; i++)
    {
      let adjacentVertex = currentVertexesEdges[i];
      let adjacentVertexLabel = indexToLabelMap[adjacentVertex];

      let isBigCave = adjacentVertexLabel.toUpperCase() === adjacentVertexLabel;
      let isSmallCave = !isBigCave && adjacentVertexLabel !== "start" && adjacentVertexLabel !== "end";
      let isStartOrEnd = adjacentVertexLabel === "start" || adjacentVertexLabel === "end";

      if (((isStartOrEnd || isSmallCave) && timesVisited[adjacentVertex] === 0) ||
        (isSmallCave && timesVisited[adjacentVertex] === 1 && !haveDoubleDipped)
        || isBigCave)
      {
        let newPath = [...path, adjacentVertex];
        pathsCount += depthFirstSearch(adjacentVertex, endVertex, newPath, haveDoubleDipped);
      }
    }

    timesVisited[currentVertex] -= 1;

    return pathsCount;
  };

  return depthFirstSearch(start, end, [start]);
}