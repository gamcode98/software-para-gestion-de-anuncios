const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { port } = require("./config");
const { connection } = require("./config/db");

const ad = require("./routes/ad.routes");
const area = require("./routes/area.routes");
const user = require("./routes/user.routes");
const auth = require("./routes/auth.routes");

const app = express();

connection();

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["https://localhost:4200"],
    credentials: true,
  })
);

ad(app);
user(app);
area(app);
auth(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
