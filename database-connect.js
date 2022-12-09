const { Client } = require("pg");
const readlineSync = require('readline-sync');

async function doDemo() {
  const client = new Client({ database: 'omdb' });
  await client.connect();

  while (readlineSync !== 'q'){
    var inputQuestion = readlineSync.question('Search for what movie? (or q to quit):');
    console.log(inputQuestion)
  
  const searchTerm = readlineSync;
  const text = "select * from movies where name like $1";
  const values = [`%${searchTerm}%`];
  
  const res = await client.query(text, values);
  console.log(res.rows);
  await client.end();
}
}
doDemo();
