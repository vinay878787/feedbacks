const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("./middlewares/error.middleware");
const authRouter = require("./routes/auth");
const feedbackRouter = require("./routes/feedback");
const db = require("./db/db");
require("express-async-errors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server up and running",
  });
});

app.use("/api/v1/oauth/", authRouter);
app.use("/api/v1/feedback/", feedbackRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running at http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`database connection error`);
  });
