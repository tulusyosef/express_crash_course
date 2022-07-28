const express = require("express");
const path = require("path");
// const exphbs = require('express-handlebars');
const logger = require("./middleware/logger");
const members = require("./Members");

const fs = require("fs");

const app = express();

// Init middleware
app.use(logger);

fs.readFile("./customers.json", "utf8", (err, data) => {
  if (err) console.error(err);
  const customers = JSON.parse(data);
  app.get("/", (req, res) =>
    res.send(customers.fields.issuelinks[0].type.name)
  );
  //   console.log(customers.version);
});

// Handlebars Middleware
// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
// app.get("/", (req, res) => res.send(members));

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
// app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
