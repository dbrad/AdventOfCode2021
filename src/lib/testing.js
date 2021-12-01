import { log } from "../app.js";

export async function describe(description, tests)
{
  log(description);
  await tests();
}
export async function it(description, test)
{
  try
  {
    await test();
    log(`&ensp;<span class="pass">PASS</span>&nbsp;<i>it ${ description }</i>`);
  }
  catch (err)
  {
    log(`&ensp;<span class="fail">FAIL</span>&nbsp;<i>it ${ description }</i>`);
    log(err);
  }
}

export function assertEquals(left, right)
{
  let result = left === right;
  if (!result)
  {
    throw `&emsp;<span class="fail">ASSERTION FAILED</span> 
    <br>&emsp;Expected ${ right }
    <br>&emsp;Recieved ${ left }`;
  }
  return result;
}