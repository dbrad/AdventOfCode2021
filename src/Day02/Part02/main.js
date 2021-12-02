/**
 * @param {string[]} input 
 * @returns {number}
 */
export default async function (input)
{
  /** @type {[string,number][]} */
  const parsedInput = input.map(str =>
  {
    const components = str.split(" ");
    const [direction, units] = [components[0], +components[1]];
    return [direction, units];
  });

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (let [direction, units] of parsedInput)
  {
    if (direction === "forward")
    {
      horizontalPosition += units;
      depth += aim * units;
    }
    else if (direction === "down")
    {
      aim += units;
    }
    else if (direction === "up")
    {
      aim -= units;
    }
  }
  return horizontalPosition * depth;
}