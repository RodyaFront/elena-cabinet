const express = require("express");
const sequelize = require("./database");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

sequelize.sync().then(() => console.log("db is ready"));
const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.forEach(({ path, route }) => {
  app.use(`/api${path}`, route);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
