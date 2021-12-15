import {log} from "../../app.js";

export default async function (input)
{
  let nextNodeIndex = 0;
  let nodeNext = [];
  let nodePrevious = [];
  let nodeValue = [];

  let head = 0;
  let tail = 0;

  let rules = {};

  const inputText = await (await fetch(input)).text();
  const [rawPolymerTemplate, rawRules] = inputText.split(/\r?\n\r?\n/);

  const polymerTemplate = rawPolymerTemplate.split("");
  for (let polymer of polymerTemplate)
  {
    let index = nextNodeIndex++;
    nodeValue[index] = polymer;
    if (index > 0)
    {
      nodeNext[index - 1] = index;
      nodePrevious[index] = index - 1;
    }
    tail = index;
  }

  let ruleStrings = rawRules.split(/\r?\n/);
  for (let ruleString of ruleStrings)
  {
    let [input, output] = ruleString.split(" -> ");
    rules[input] = output;
  }

  let printList = () =>
  {
    let nodeIndex = 0;
    let iterator = 0;
    let output = "";
    while (iterator < nodeValue.length)
    {
      output += nodeValue[nodeIndex];
      nodeIndex = nodeNext[nodeIndex];
      iterator++;
    }
    log(output);
  };

  // printList();
  for (let iteration = 0; iteration < 10; iteration++)
  {
    let leftIndex = head;
    let rightIndex = nodeNext[leftIndex];

    while (leftIndex !== tail)
    {
      let elementA = nodeValue[leftIndex];
      let elementB = nodeValue[rightIndex];

      let polymer = `${ elementA }${ elementB }`;

      if (rules[polymer])
      {
        let nodeIndex = nextNodeIndex++;
        nodeValue[nodeIndex] = rules[polymer];

        nodePrevious[nodeIndex] = leftIndex;
        nodeNext[nodeIndex] = rightIndex;

        nodeNext[leftIndex] = nodeIndex;
        nodePrevious[rightIndex] = nodeIndex;
      }

      leftIndex = rightIndex;
      rightIndex = nodeNext[leftIndex];
    }
    // printList();
  }

  let nodeIndex = 0;
  let iterator = 0;
  let nextElementIndex = 0;
  let elementIndexes = {};
  let elementCounts = [];
  let polymerLength = nodeValue.length;
  while (iterator < polymerLength)
  {
    let element = nodeValue[nodeIndex];
    let elementIndex = elementIndexes[element];
    if (elementIndex === undefined)
    {
      elementIndex = elementIndexes[element] = nextElementIndex++;
      elementCounts[elementIndex] = 0;
    }
    elementCounts[elementIndex]++;

    nodeIndex = nodeNext[nodeIndex];
    iterator++;
  }

  elementCounts.sort((a, b) => b - a);

  return elementCounts[0] - elementCounts[elementCounts.length - 1];
}
