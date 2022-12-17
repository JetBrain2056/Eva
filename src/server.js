// requirements
require('dotenv').config();
const express            = require('express');
const sequelize          = require('./db');
const { router }         = require('./routers/router.js');

const port   = process.env.port || 3000;
const host   = '0.0.0.0';
const server = express();

//server.set('views', '../views');
server.set('view engine', 'twig');
server.set('view options', {layout: false});

// This section is optional and used to configure twig.
server.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false
});

server.use(express.static('./views'));
server.use(express.urlencoded({ extended: false }));
server.use(router);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

//SQL ORM Sequelize
const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      
  } catch (e) {
      console.log(e)
  }
}

start()  