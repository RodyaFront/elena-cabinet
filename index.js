const express = require("express");
const sequelize = require("./database");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const cors = require("cors");
const logger = require("./src/utils/logger");

sequelize.sync().then(() => {
  logger.log({
    level: "info",
    message: `Database is ready.`,
  });
});

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.forEach(({ path, route }) => {
  app.use(`/api${path}`, route);
});

// Добавление логгера в middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  logger.info({
    level: "info",
    message: `Server has started on port ${PORT}`,
  });
});
