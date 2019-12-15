// pigpio can only be installed on a raspberry pi.  apt-get install pigpio
// so npm install, will fail on a non raspberry pi computer.
const Gpio = require('pigpio').Gpio;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

PORT = 3113;

/** Responds with the latest data. */
app.get("/data", (req, res) => {
	const data = { 
		data: "This is the data you are looking for.",
		timestamp: 2019,
		level: 67,
		temp: 42
 };
  res.status(200).json(data);
});

app.listen(PORT, () => console.log(`goatpi_kid started on port ${PORT}!`));
