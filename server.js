express = require("express");
app = express();
cors = require("cors");
dotenv = require("dotenv");
dotenv.config();
const corsOptions = {
  origin: "https://matchupde.netlify.app/",
};
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { PORT, DBUSER, DBPASS, DBHOST, DBNAME } = process.env;
//console.log(PORT, DBUSER, DBPASS, DBHOST, DBNAME);
const mongoDB = `mongodb+srv://${DBUSER}:${DBPASS}@${DBHOST}/${DBNAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  cors({
    credentials: true,
  })
);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(
  session({
    secret: "Aria51",
    cookie: {},
  })
);
const bodyParser = require("body-parser");

const users = require("./routes/Users");
const events = require("./routes/Events");
const leagues = require("./routes/Leagues");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", users);
app.use("/", events);
app.use("/", leagues);
app.use("/", (req, res) => res.send("Welcome to MatchUp"));

app.listen(PORT || 3000, () =>
  console.log(`Server is listening on Port ${PORT}`)
);
