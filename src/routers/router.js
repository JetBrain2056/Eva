const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Developer
router.get('/', controller.Auth);
router.post('/', controller.Signin);

router.get('/getusers', controller.getUsers);
router.post('/getuser', controller.getUser);
router.post('/createuser', controller.createUser);
router.post('/updateuser', controller.updateUser);
router.post('/deluser', controller.deleteUser);

router.get('/getroles', controller.getRoles); 
router.post('/createrole', controller.createRole);
router.post('/delrole', controller.deleteRole);

router.get('/getconfig', controller.getConfig);
router.post('/createobject', controller.createObject);
router.post('/delobject', controller.deleteObject);
router.post('/editobject', controller.editObject);
router.post('/getobject', controller.getObject);
router.post('/updateconf', controller.updateConfig);
router.get('/gettmp', controller.getTmp);
router.post('/createreq', controller.createReq);
router.post('/editreq', controller.editReq);

//eva-app
router.get('/subsystems', controller.getSubsystems);
router.post('/getrefs', controller.getReferences);
router.post('/getref', controller.getReference);
router.post('/createref', controller.createReference);
router.post('/updateref', controller.updateReference);
router.post('/delref', controller.deleteReference);

module.exports = { router }                                                  