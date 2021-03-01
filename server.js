express = require("express");
app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const users = require("./routes/Users");
const events = require("./routes/Events");
const leagues = require("./routes/Leagues");

const mongoDB =
  "mongodb+srv://dbUser:M0ng02020@cluster0.xbvep.mongodb.net/MatchUp?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

PORT = 3000;

app.use("/", users);
app.use("/", events);
app.use("/", leagues);

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
