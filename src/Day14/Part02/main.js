/**
 * @param {{[key:string]: number}} map 
 * @param {string} key 
 * @param {number} amount 
 * @returns 
 */
function increaseKey(map, key, amount = 1)
{
  if (!(key in map))
    map[key] = 0;
  map[key] += amount;
  return map;
}

/**
 * @param {{[key:string]: string}} rules 
 * @param {number} depth 
 * @param {{[key:number]: {[key:string]: {[key:string]: number}}}} accumulator 
 */
function accumulatePairCounts(rules, depth, accumulator = {})
{
  accumulator[depth] = {};
  if (depth == 1)
  {
    for (let ruleInput in rules)
    {
      let ruleOutput = rules[ruleInput];
      accumulator[depth][ruleInput] = {};
      accumulator[depth][ruleInput] = increaseKey(accumulator[depth][ruleInput], ruleOutput);
    }
  }
  else
  {
    accumulator = accumulatePairCounts(rules, depth - 1, accumulator);
    for (let ruleInput of Object.keys(rules))
    {
      let ruleOutput = rules[ruleInput];
      accumulator[depth][ruleInput] = {[ruleOutput]: 1};

      let pairs = [`${ ruleInput[0] }${ ruleOutput }`, `${ ruleOutput }${ ruleInput[1] }`];
      for (let pair of pairs)
      {
        if (pair in accumulator[depth - 1])
        {
          let map = accumulator[depth - 1][pair];
          for (let key of Object.keys(map))
            accumulator[depth][ruleInput] = increaseKey(accumulator[depth][ruleInput], key, map[key]);
        }
      }
    }
  }
  return accumulator;
}

export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const [rawPolymerTemplate, rawRules] = inputText.split(/\r?\n\r?\n/);

  const polymerTemplate = rawPolymerTemplate.split("");
  const polymerTemplateLength = polymerTemplate.length;

  let ruleStrings = rawRules.split(/\r?\n/);
  let rules = {};
  for (let ruleString of ruleStrings)
  {
    let [input, output] = ruleString.split(" -> ");
    rules[input] = output;
  }

  let steps = 40;
  var tree = accumulatePairCounts(rules, steps);

  var result = {};
  for (let index = 0; index < polymerTemplateLength - 1; index++)
  {
    result = increaseKey(result, polymerTemplate[index]);
    var pair = polymerTemplate[index] + polymerTemplate[index + 1];
    for (let key of Object.keys(tree[steps][pair]))
    {
      result = increaseKey(result, key, tree[steps][pair][key]);
    };
  }
  result = increaseKey(result, polymerTemplate[polymerTemplateLength - 1]);

  return Math.max(...Object.values(result)) - Math.min(...Object.values(result));
}
