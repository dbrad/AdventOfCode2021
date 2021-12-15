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

  const visited = [];
  const depthFirstSearch = (current, end, path) =>
  {
    let pathsCount = 0;
    if (current === end)
    {
      return 1;
    }

    visited[current] = true;

    let currentEdges = edges[current];
    for (let i = 0; i < currentEdges.length; i++)
    {
      let vertexIndex = currentEdges[i];
      let vertexLabel = indexToLabelMap[vertexIndex];
      if (!visited[vertexIndex] || vertexLabel.toUpperCase() === vertexLabel)
      {
        let newPath = [...path, vertexIndex];
        pathsCount += depthFirstSearch(vertexIndex, end, newPath);
      }
    }

    visited[current] = false;
    return pathsCount;
  };

  return depthFirstSearch(start, end, [start]);
}