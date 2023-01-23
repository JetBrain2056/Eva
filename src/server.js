// requirements
require('dotenv').config();
const express            = require('express');
const sequelize          = require('./db');
const { router }         = require('./routers/router.js');

const port   = process.env.PORT||3000;
const host   = process.env.HOST||'0.0.0.0'||'127.0.0.1';
const server = express();

server.set('view engine', 'twig');
server.set('view options', {layout: false});
server.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false
}); 

server.use("/css",express.static('./node_modules/bootstrap/dist/css'));
server.use("/js",express.static('./node_modules/bootstrap/dist/js')); 
server.use("/@popperjs",express.static('./node_modules/@popperjs')); 
server.use("/font-awesome",express.static('./node_modules/font-awesome'));

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

