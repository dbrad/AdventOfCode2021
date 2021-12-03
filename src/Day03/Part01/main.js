import {log} from "../../app.js";

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let parsedInput = input.map(str => str.split("").map(num => Number(num)));
  let gammaRate = 0;
  let epsilonRate = 0;

  let inputLength = input.length;
  let halfLength = Math.round(inputLength / 2);
  let majority = halfLength + 1;

  let lineLength = input[0].length;

  for (let position = 0; position < lineLength; position++)
  {
    gammaRate = gammaRate << 1;
    epsilonRate = epsilonRate << 1;
    let ones = 0;
    let zeros = 0;
    for (let searchOffset = 0; searchOffset < inputLength; searchOffset++)
    {
      if (parsedInput[searchOffset][position])
      {
        ones++;
      }
      else 
      {
        zeros++;
      }

      if (ones >= majority)
      {
        gammaRate += 1;
        break;
      }
      else if (zeros >= majority)
      {
        epsilonRate += 1;
        break;
      }
    }
  }
  return gammaRate * epsilonRate;
}