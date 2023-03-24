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
  });

}

luckyDraw('joe')
  .catch((error) => {
    console.log(error)
  })
  .then(() => {
    luckyDraw('caroline')
      .catch((error) => {
        console.log(error);
      })
  })

  .then(() => {
    luckyDraw('sabrina')
      .catch((error) => {
        console.log(error);
      })
  });
