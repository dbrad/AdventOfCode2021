/**
 * @param {number[]} input 
 * @returns {number}
 */
export default async function (input)
{
  let minimum = Number.MAX_SAFE_INTEGER;
  let maximum = 0;
  for (let submarinePosition of input)
  {
    if (submarinePosition < minimum)
      minimum = submarinePosition;
    if (submarinePosition > maximum)
      maximum = submarinePosition;
  }

  let bestSum = Number.MAX_SAFE_INTEGER;
  for (let position = 0; position <= maximum; position++)
  {
    let sum = 0;
    for (let submarinePosition of input)
    {
      let n = Math.abs(submarinePosition - position);
      sum += (n * (n + 1)) / 2;
    }
    if (sum < bestSum)
      bestSum = sum;
  }
  return bestSum;
}