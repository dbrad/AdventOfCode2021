/**
  * @param {number[]} input
  * @returns {number}
  */
export default async function (input)
{
  const inputLength = input.length;
  let increases = 0;
  for (let i = 1; i < inputLength; i++)
  {
    if (input[i] > input[i - 1])
    {
      increases++;
    }
  }
  return increases;
}