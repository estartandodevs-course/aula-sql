const SQLite = require("sqlite3");
const path = require("path");

const { faker } = require("@faker-js/faker");

const fileDatabase = path.join(__dirname, "db", "database.sqlite");

SQLite.verbose();
const db = new SQLite.Database(fileDatabase);

const callback = (err, result) => {
  if (err) {
    console.log(err);
  }
};

const createTableUser = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    ); 
  `;

  db.run(sql, callback);
};

function insertUser() {
  const name = faker.name.fullName();
  const email = faker.internet.email();

  const sql = `INSERT INTO users (name, email) VALUES (?, ?);`;
  const values = [name, email];

  db.run(sql, values, callback);
}

async function main() {
  await createTableUser();

  // for (let i = 0; i < 100; i++) {
  //   insertUser()
  // }

  db.close();
}

main();
