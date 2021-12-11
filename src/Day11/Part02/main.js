/**
 * @param {number[]} grid 
 * @returns {number}
 */
function step(grid)
{
  let flashes = 0;
  let flashInProgress = false;
  for (let i = 0; i < 100; i++)
  {
    grid[i] += 1;
    if (grid[i] > 9)
    {
      flashInProgress = true;
    }
  }

  while (flashInProgress)
  {
    flashInProgress = false;
    for (let i = 0; i < 100; i++)
    {
      if (grid[i] > 9)
      {
        flashInProgress = true;
        flashes++;
        grid[i] = -1;
        let x = i % 10;
        let y = Math.floor(i / 10);
        for (let nx = -1; nx <= 1; nx++)
        {
          for (let ny = -1; ny <= 1; ny++)
          {
            increaseNeighbour(grid, x + nx, y + ny);
          }
        }
      }
    }
  }

  for (let i = 0; i < 100; i++)
  {
    if (grid[i] < 0)
      grid[i] = 0;
  }
  return flashes;
}

function increaseNeighbour(grid, x, y)
{
  if (x >= 0 && x < 10 && y >= 0 && y < 10)
  {
    let index = x + y * 10;
    if (grid[index] > -1)
    {
      grid[index]++;
    }
  }
}

export default async function (input)
{
  let grid = input.join("").split("").map(str => +str);
  for (let i = 0; i < 1000; i++)
  {
    if (step(grid) === 100)
    {
      return i + 1;
    }
  }
  return -1;
}