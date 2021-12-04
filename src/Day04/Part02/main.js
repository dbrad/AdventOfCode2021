export default async function (input)
{
  const inputText = await (await fetch(input)).text();
  const inputChunks = inputText.split("\n\n");
  const callNumbers = inputChunks[0].split(",").map(strNum => Number(strNum));
  const bingoCards = [];
  const bingoCardMarkers = [];
  for (let i = 1; i < inputChunks.length; i++)
  {
    let bingoCard = [];
    let cardLineStrings = inputChunks[i].split("\n");
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

  let finalWinningCardIndex = -1;
  let finalWinningNumber = -1;
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

      if (bingoFound && bingoCards.length === 1)
      {
        finalWinningNumber = callNumber;
        finalWinningCardIndex = bingoCardIndex;
        break;
      }
      else if (bingoFound)
      {
        // if this isn't the last card to win, remove it from the card arrays
        bingoCards.splice(bingoCardIndex, 1);
        bingoCardMarkers.splice(bingoCardIndex, 1);
      }
    }
    if (finalWinningCardIndex > -1) break;
  }

  let finalWinningCard = bingoCards[finalWinningCardIndex];
  let finalWinningCardMarkers = bingoCardMarkers[finalWinningCardIndex];
  let unmarkedSum = 0;
  for (let index = 0; index < finalWinningCard.length; index++)
  {
    if (!finalWinningCardMarkers[index])
    {
      unmarkedSum += finalWinningCard[index];
    }
  }

  return unmarkedSum * finalWinningNumber;
}

