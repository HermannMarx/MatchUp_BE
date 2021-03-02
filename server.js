express = require("express");
app = express();
dotenv = require("dotenv");
dotenv.config();

const { PORT, DBUSER, DBPASS, DBHOST, DBNAME } = process.env;
console.log(PORT, DBUSER, DBPASS, DBHOST, DBNAME);

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const users = require("./routes/Users");
const events = require("./routes/Events");
const leagues = require("./routes/Leagues");

const mongoDB = `mongodb+srv://${DBUSER}:${DBPASS}@${DBHOST}/${DBNAME}`;

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", users);
app.use("/", events);
app.use("/", leagues);

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
