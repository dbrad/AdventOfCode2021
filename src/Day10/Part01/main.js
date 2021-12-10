const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let syntaxErrors = [];
  for (let inputLine of input)
  {
    let characters = inputLine.split("");
    let expectedCharacters = [];
    for (let character of characters)
    {
      if (character === "(")
        expectedCharacters.push(")");
      else if (character === "[")
        expectedCharacters.push("]");
      else if (character === "{")
        expectedCharacters.push("}");
      else if (character === "<")
        expectedCharacters.push(">");
      else
      {
        if (character === expectedCharacters[expectedCharacters.length - 1])
          expectedCharacters.pop();
        else
        {
          syntaxErrors.push(character);
          break;
        }
      }
    }
  }
  let score = 0;
  for (let syntaxError of syntaxErrors)
    score += scores[syntaxError];

  return score;
}