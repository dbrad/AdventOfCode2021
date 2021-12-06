export default async function (input)
{
  let fishPerTimer = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
  for (let fishTimer of input)
  {
    fishPerTimer[fishTimer]++;
  }
  for (let generation = 0; generation < 256; generation++)
  {
    let newCounts = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
    for (let time = 0; time < 9; time++)
    {
      if (time === 0)
      {
        newCounts[8] += fishPerTimer[time];
        newCounts[6] += fishPerTimer[time];
      }
      else
      {
        newCounts[time - 1] += fishPerTimer[time];
      }
    }
    fishPerTimer = newCounts;
  }

  let sum = 0n;
  for (let fishCount of fishPerTimer)
  {
    sum += fishCount;
  }
  return sum;
}