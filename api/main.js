const express = require("express");
const cors = require("cors");
const session = require("express-session");
const facilityRouter = require("./routes/facilityRouter");
const userRouter = require("./routes/userRouter");
const vehicleRouter = require("./routes/vehicleRouter");
const commentRouter = require("./routes/commentRouter");

const port = 3000;
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://localhost:8080",
      "http://localhost:8081",
      "https://localhost:8081",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(
  session({
    secret: "husahd721hd21hd712hdsaggf1g908s0bc73",
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 60000 * 60 * 24 * 7,
    },
  })
);

//rute
app.use("/facility", facilityRouter);
app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);
app.use("/comment", commentRouter);

app.listen(port, async () => {
  console.log(`Server running at port ${port}`);
});
