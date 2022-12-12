const { Client } = require("pg");
const readlineSync = require('readline-sync');
const { convertTypeAcquisitionFromJson } = require("typescript");

async function doDemo() {
  const client = new Client({ database: 'omdb' });
  await client.connect();

 console.log('Welcome to search-movies-cli!',
 '[1] Search',
 '[2] See favourites',
 '[3] Quit')
  while (true){
  let optionAnswer = readlineSync.question('Choose an action! [1, 2, 3]:')
  const typedAnswer = optionAnswer
  console.log(optionAnswer)

  if (typedAnswer === '1'){
  let questionAnswer = readlineSync.question('Search for a movie:');
  const searchTerm = questionAnswer;
  
  const text = "select id, name, runtime, budget, revenue, vote_average, votes_count from movies where name like $1 and kind = 'movie' order by date desc limit 10";
  const values = [`%${searchTerm}%`];
  const res = await client.query(text, values);
  console.table(res.rows)
  console.log(`[1] ${res.rows[0].name}`, `[2] ${res.rows[1].name}`, `[3] ${res.rows[2].name}`, `[4] ${res.rows[3].name}`, `[5] ${res.rows[4].name}`, `[6] ${res.rows[5].name}`, `[7] ${res.rows[6].name}`, `[8] ${res.rows[7].name}`, `[9] ${res.rows[8].name}`)


  let favouriteOption = readlineSync.question('Choose a movie to add to your favourites [1....8 / 0]')
  const faveText = "insert into favourites (movie_id) values ($1)"
  const faveValues = [favouriteOption -1]
  if (favouriteOption === '0'){
    await client.end();
  }
  const faveRes = await client.query(faveText,faveValues)
  console.log(`Saving favourite movie: ${favouriteOption}`)
  
} else if (typedAnswer === '2'){
  console.log('Here are your saved favourites:')
  const text = "select * from favourites"
  const res = await client.query(text);
  console.table(res.rows)

} else if (typedAnswer === '3'){
  await client.end();
  break

}
}
}

doDemo();
