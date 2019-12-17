// pigpio can only be installed on a raspberry pi.  apt-get install pigpio
// so npm install, will fail on a non raspberry pi computer.
// const Gpio = require('pigpio').Gpio;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mysql = require('mysql');
const keys = require('./keys');

PORT = 3113;

const db = mysql.createConnection ({
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;

/** Responds with the latest data. */
app.get('/data', (req, res) => {
  const data = {
    data: 'This is the data you are looking for.',
    timestamp: 2019,
    level: 67,
    temp: 42
  };
  res.status(200).json(data);
});

// db query test.
app.get('/db', (req, res) => {
  let query = "SELECT * FROM GoatData;";
  db.query(query, (err, result) => {
    if (err) {
        console.log('error: ', err);
    }
    console.log('results: ', result);
    res.send(result)
    });
});


app.listen(PORT, () => console.log(`goatpi_kid started on port ${PORT}!`));
