const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");
const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  })
  .then(() => {
    if (err) {
      console.log(err);
    }
    console.log("Database Connected Successfully");
  });

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["post"] },
      { url: "/users/register", methods: ["post"] },
    ],
  })
);
app.use(express.json());
app.use("/users", require("./routes/userroute"));
app.use(errors.errorhandler);
app.listen(process.env.port || 4000, function () {
  console.log("Port run on 4000");
});
