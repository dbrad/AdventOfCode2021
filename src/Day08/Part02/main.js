/**
 * @param {string[]} digitA 
 * @param {string[]} digitB 
 * @returns {number}
*/
function howManySegmentsOverlap(digitA, digitB)
{
  let result = 0;
  for (let digitSignalA of digitA)
  {
    for (let digitSignalB of digitB)
    {
      if (digitSignalA === digitSignalB)
      {
        result++;
        break;
      }
    }
  }
  return result;
}

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let sum = 0;
  for (let inputLine of input)
  {
    let splitInput = inputLine.split(" | ");
    let digitMapping = [];
    let digitInformation = splitInput[0].split(" ").map(str => str.split("").sort());
    for (let digit of digitInformation)
    {
      if (digit.length === 2)
      {
        digitMapping[1] = digit;
      }
      else if (digit.length === 3)
      {
        digitMapping[7] = digit;
      }
      else if (digit.length === 4)
      {
        digitMapping[4] = digit;
      }
      else if (digit.length === 7)
      {
        digitMapping[8] = digit;
      }
    }
    for (let digit of digitInformation)
    {
      if (digit.length === 5)
      {
        let overlapWith1 = howManySegmentsOverlap(digit, digitMapping[1]);
        let overlapWith4 = howManySegmentsOverlap(digit, digitMapping[4]);
        if (overlapWith4 === 3)
        {
          if (overlapWith1 === 2)
          {
            digitMapping[3] = digit;
          }
          else
          {
            digitMapping[5] = digit;
          }
        }
        else
        {
          digitMapping[2] = digit;
        }
      }
      else if (digit.length === 6)
      {
        let overlapWith1 = howManySegmentsOverlap(digit, digitMapping[1]);
        let overlapWith4 = howManySegmentsOverlap(digit, digitMapping[4]);
        if (overlapWith4 === 4 && overlapWith1 === 2)
        {
          digitMapping[9] = digit;
        }
        else if (overlapWith4 === 3 && overlapWith1 === 2)
        {
          digitMapping[0] = digit;
        }
        else
        {
          digitMapping[6] = digit;
        }
      }
    }
    let digitOuput = splitInput[1].split(" ").map(str => str.split("").sort());
    let resultRaw = "";
    for (let digitSignal of digitOuput)
    {
      for (let mappedDigit = 0; mappedDigit <= 9; mappedDigit++)
      {
        if (digitMapping[mappedDigit].join("") === digitSignal.join(""))
        {
          resultRaw += "" + mappedDigit;
          break;
        }
      }
    }
    sum += parseInt(resultRaw, 10);
  }
  return sum;
}