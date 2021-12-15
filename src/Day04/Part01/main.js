export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const inputChunks = inputText.split(/\r?\n\r?\n/);
  const callNumbers = inputChunks[0].split(",").map(strNum => Number(strNum));
  const bingoCards = [];
  const bingoCardMarkers = [];
  for (let i = 1; i < inputChunks.length; i++)
  {
    let bingoCard = [];
    let cardLineStrings = inputChunks[i].split(/\r?\n/);
    for (let cardLine of cardLineStrings)
    {
      for (let stringIndex = 0; stringIndex < 14; stringIndex += 3)
      {
        bingoCard.push(Number(cardLine.substr(stringIndex, 2)));
      }
    }
    bingoCards.push(bingoCard);
    bingoCardMarkers.push([]);
  }

  let winningCardIndex = -1;
  let winningNumber = -1;
  for (let callNumber of callNumbers)
  {
    // loop through all cards and mark the call number down
    for (let bingoCardIndex = 0; bingoCardIndex < bingoCards.length; bingoCardIndex++)
    {
      let bingoCard = bingoCards[bingoCardIndex];
      for (let cardNumberIndex = 0; cardNumberIndex < bingoCard.length; cardNumberIndex++)
      {
        if (bingoCard[cardNumberIndex] === callNumber)
        {
          bingoCardMarkers[bingoCardIndex][cardNumberIndex] = true;
          break;
        }
      }
    }

    // check all of the cards for winning rows and column
    for (let bingoCardIndex = 0; bingoCardIndex < bingoCardMarkers.length; bingoCardIndex++)
    {
      let bingoFound = false;
      let card = bingoCardMarkers[bingoCardIndex];
      for (let row = 0; row <= 20; row += 5)
      {
        bingoFound = bingoFound || (card[row] && card[row + 1] && card[row + 2] && card[row + 3] && card[row + 4]);
      }
      for (let col = 0; col <= 4; col++)
      {
        bingoFound = bingoFound || (card[col] && card[col + 5] && card[col + 10] && card[col + 15] && card[col + 20]);
      }

      if (bingoFound)
      {
        winningNumber = callNumber;
        winningCardIndex = bingoCardIndex;
        break;
      }
    }
    if (winningCardIndex > -1) break;
  }

  let winningCard = bingoCards[winningCardIndex];
  let winningCardMarkers = bingoCardMarkers[winningCardIndex];
  let unmarkedSum = 0;
  for (let index = 0; index < winningCard.length; index++)
  {
    if (!winningCardMarkers[index])
    {
      unmarkedSum += winningCard[index];
    }
  }

  return unmarkedSum * winningNumber;
}

