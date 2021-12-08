/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let ones = 0;
  let fours = 0;
  let sevens = 0;
  let eights = 0;
  for (let inputLine of input)
  {
    let rawOutput = inputLine.split(" | ")[1];
    let outputDigits = rawOutput.split(" ");
    for (let digit of outputDigits)
    {
      if (digit.length === 2)
      {
        ones++;
      }
      else if (digit.length === 4)
      {
        fours++;
      }
      else if (digit.length === 3)
      {
        sevens++;
      }
      else if (digit.length === 7)
      {
        eights++;
      }
    }
  }
  return ones + fours + sevens + eights;
}