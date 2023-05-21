const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Get index data  
router.get('/', controller.Auth);

//Post index data  
router.post('/', controller.Signin);

//Post index data    
router.post('/lang', controller.Lang);

//router.post('/signup', UserController.signup)
//router.post('/login', UserController.login)
//router.get('/check', UserController.check)

router.get('/users', controller.getUsers);
router.post('/getone', controller.getOne);
router.post('/createuser', controller.createUser);
router.post('/updateuser', controller.updateUser);
//router.delete('/delete/:id([0-9]+)', controller.delete)
router.post('/deleteuser', controller.deleteUser);

router.get('/roles', controller.getRoles);
router.post('/createrole', controller.createRole)

module.exports = { router }                                                  