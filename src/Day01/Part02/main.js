/**
  * @param {number[]} input
  * @returns {number}
  */
export default async function (input)
{
  const inputLength = input.length;
  let increases = 0;
  for (let i = 0; i < inputLength - 3; i++)
  {
    if (input[i + 1] + input[i + 2] + input[i + 3] > input[i] + input[i + 1] + input[i + 2])
    {
      increases++;
    }
  }
  return increases;
}