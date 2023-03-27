function luckyDraw(player) {
  return promise = new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));



    process.nextTick(() => {
      if (win) {
        resolve(console.log(`${player} won a prize in the draw!`));
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });

  })



}




async function getResults() {
  let player1;
  let player2;
  let player3;

  console.log(`the results are:`)
  try {
    player1 = await luckyDraw(`tina`)

  }
  catch (error) {
    console.error(error)
  }

  try {
    player2 = await luckyDraw(`jorge`)

  }
  catch (error) {
    console.error(error)
  }

  try {
    player3 = await luckyDraw(`julien`)

  }
  catch (error) {
    console.error(error)
  }


}

getResults();


