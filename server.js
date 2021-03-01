express = require("express");
app = express();
users = require("./routes/Users");
events = require("./routes/Events");
leagues = require("./routes/Leagues");

PORT = 3000;

app.use("/", users);
app.use("/", events);
app.use("/", leagues);

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
