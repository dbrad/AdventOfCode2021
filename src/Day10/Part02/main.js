const scores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let autocompleteForLines = [];
  for (let lineIndex = 0, inputLength = input.length; lineIndex < inputLength; lineIndex++)
  {
    const line = input[lineIndex];
    const characters = line.split("");
    let expectedCharacters = [];
    let isLineCorrupt = false;
    for (let characterIndex = 0, lineLength = characters.length; characterIndex < lineLength; characterIndex++)
    {
      let character = characters[characterIndex];
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
          isLineCorrupt = true;
          break;
        }
      }
    }
    if (!isLineCorrupt)
      autocompleteForLines.push(expectedCharacters.reverse());
  }

  let autocompleteScores = [];
  for (let autocompleteData of autocompleteForLines)
  {
    let score = 0;
    for (let syntax of autocompleteData)
      score = score * 5 + scores[syntax];
    autocompleteScores.push(score);
  }

  autocompleteScores.sort((a, b) => b - a);

  return autocompleteScores[Math.floor(autocompleteScores.length / 2)];
}