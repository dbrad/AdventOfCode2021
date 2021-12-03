
function getOxygenGeneratorRating(diagnosticReport)
{
  const inputFieldLength = diagnosticReport[0].length;
  let bitCheckPosition = 0;
  while (diagnosticReport.length > 1 && bitCheckPosition < inputFieldLength)
  {
    let reportLength = diagnosticReport.length;
    let majority = Math.floor(reportLength / 2) + 1;

    let commonBit = 1;
    let ones = 0;
    let zeros = 0;
    for (let inputIndex = 0; inputIndex < reportLength; inputIndex++)
    {
      if (diagnosticReport[inputIndex][bitCheckPosition])
        ones++;
      else
        zeros++;

      if (zeros >= majority)
      {
        commonBit = 0;
        break;
      }
      else if (ones >= majority)
      {
        break;
      }
    }

    diagnosticReport = filterReportInput(diagnosticReport, commonBit, bitCheckPosition);
    bitCheckPosition++;
  }

  return binaryArrayToNumber(diagnosticReport[0]);
}

function getCO2ScruberRating(diagnosticReport)
{
  const inputFieldLength = diagnosticReport[0].length;
  let bitCheckPosition = 0;
  while (diagnosticReport.length > 1 && bitCheckPosition < inputFieldLength)
  {
    let reportLength = diagnosticReport.length;
    let majority = Math.floor(reportLength / 2) + 1;

    let uncommonBit = 0;
    let ones = 0;
    let zeros = 0;
    for (let inputIndex = 0; inputIndex < reportLength; inputIndex++)
    {
      if (diagnosticReport[inputIndex][bitCheckPosition])
        ones++;
      else
        zeros++;

      if (zeros >= majority)
      {
        uncommonBit = 1;
        break;
      }
      else if (ones >= majority)
      {
        break;
      }
    }
    diagnosticReport = filterReportInput(diagnosticReport, uncommonBit, bitCheckPosition);
    bitCheckPosition++;
  }

  return binaryArrayToNumber(diagnosticReport[0]);
}

function binaryArrayToNumber(bianryArray)
{
  let result = 0;
  for (let bit of bianryArray)
  {
    result = (result << 1) + bit;
  }
  return result;
}

function filterReportInput(report, bitValue, position)
{
  let filteredInput = [];
  for (let inputIndex = 0, reportLength = report.length; inputIndex < reportLength; inputIndex++)
  {
    if (report[inputIndex][position] === bitValue)
    {
      filteredInput.push(report[inputIndex]);
    }
  }
  return filteredInput;
}

/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let parsedInput = input.map(str => str.split("").map(num => Number(num)));
  let oxygenGeneratorRating = getOxygenGeneratorRating(parsedInput);
  parsedInput = input.map(str => str.split("").map(num => Number(num)));
  let co2ScrubberRating = getCO2ScruberRating(parsedInput);

  return oxygenGeneratorRating * co2ScrubberRating;
}