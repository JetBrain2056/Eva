const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Get index data  
router.get('/', controller.Auth);

//Post index data  
router.post('/', controller.Signin);

//Post index data 

router.get('/users', controller.getUsers);
router.post('/getone', controller.getOne);
router.post('/createuser', controller.createUser);
router.post('/updateuser', controller.updateUser);
//router.delete('/delete/:id([0-9]+)', controller.delete)
router.post('/deluser', controller.deleteUser);

router.get('/roles', controller.getRoles);
router.post('/createrole', controller.createRole);
router.post('/delrole', controller.deleteRole);

router.get('/config', controller.getConfig);
router.post('/createconf', controller.createConfig);
router.post('/delconf', controller.deleteConfig);
router.post('/editobject', controller.editObject);
router.post('/getobject', controller.getObject);

router.post('/updateconf', controller.updateConfig);

module.exports = { router }                                                  