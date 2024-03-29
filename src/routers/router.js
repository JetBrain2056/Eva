const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Developer
router.get('/', controller.Auth);
router.post('/', controller.Signin);

router.get('/getusers', controller.getUsers);
router.get('/getlistusers', controller.getListUsers);
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
router.post('/checkobject', controller.checkObject);
router.post('/updateconf', controller.updateConfig);

router.post('/getreqs', controller.getReqs);
router.post('/getreq', controller.getReq);
router.post('/createreq', controller.createReq);
router.post('/editreq', controller.editReq);
router.post('/delreq', controller.deleteReq);

router.post('/gettabparts', controller.getTabparts);
router.post('/gettabpart', controller.getTabpart);
router.post('/createtabpart', controller.createTabpart);
router.post('/edittabpart', controller.editTabpart);
router.post('/deltabpart', controller.deleteTabpart);

router.post('/gettabpartreqs', controller.getTabPartReqs);
router.post('/gettabpartreq', controller.getTabPartReq);
router.post('/createtabpartreq', controller.createTabPartReq);
router.post('/edittabpartreq', controller.editTabPartReq);
router.post('/deltabpartreq', controller.deleteTabPartReq);

//eva-app
router.get('/subsystems', controller.getSubsystems);
router.post('/getrefs', controller.getReferences);
router.post('/getownerrefs', controller.getOwnerReferences);
router.post('/getref', controller.getReference);
router.post('/getrefcol', controller.getRefColumns);
router.post('/createref', controller.createReference);
router.post('/updateref', controller.updateReference);
router.post('/delref', controller.deleteReference);
router.post('/getowner', controller.getOwner);
router.post('/getnumber', controller.getObjectNumber);

module.exports = { router }                                                  