const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Get index data  
router.get('/', controller.Auth);

//Post index data  
router.post('/', controller.Signin);

//Post index data    
//router.get('/common/dashboard', controller.Signin);

//router.post('/signup', UserController.signup)
//router.post('/login', UserController.login)
//router.get('/check', UserController.check)

router.get('/users', controller.getAll);
//router.get('/getone/:id([0-9]+)', UserController.getOne)
router.post('/create', controller.Create)
//router.put('/update/:id([0-9]+)', UserController.update)
//router.delete('/delete/:id([0-9]+)', controller.delete)
router.post('/delete', controller.Delete)

module.exports = { router }                                                  