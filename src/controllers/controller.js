const { User, Role, Config, Subsystem, Constant, Module, Requisite, TabPart, TabPartReq, Form } = require('../models/models.js');
const { content }       = require('../index.js');
const bcrypt            = require('bcrypt');
const sequelize         = require('../db');
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 }    = require('uuid');
//const jwt              = require('jsonwebtoken');

function dateNow() {
    let date = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
async function hashPassword(password, saltRounds = 10) {
    try {
        // Generate a salt
        const salt =  await bcrypt.genSalt(saltRounds)

        // Hash password
        const hash =  await bcrypt.hash(password, salt)
        console.log('hash: ', hash)
        return hash;
    } catch(err) {
        console.log(err);
    }
}
/* function generateJwt(id, login, role) => {
     return jwt.sign(
         {id, login, role},
         process.env.SECRET_KEY,
         {expiresIn: '24h'}
     )
 }
exports.check = function(req, res, next) {
     const token = generateJwt(req.user.id, req.user.login, req.user.role)
    return res.json({token})
} */
exports.Auth = function(req,res) {
    console.log(dateNow(),'>>Auth()...');
    if (!req.body) return res.sendStatus(400);
    content.logged = false;
    res.render('index.twig', content);
}
exports.Signin = async function(req, res) {
    console.log(dateNow(),'>>Signin()...');
    if (!req.body) return res.sendStatus(400);

    const operMode = req.body.operation_mode;

    if (operMode === 'on') {
        content.mode = true;
    } else if (operMode === 'off') {
        content.mode = false;
    }

    const username = req.body.username;
    const password = req.body.password;

    const result    = await User.count();
    const roleCount = await Role.count();
    console.log('User count: ', result);

    if (result === 0) { 
        if (roleCount === 0) {
            await Role.create({Name: 'Administrator'}); 
        }
        if (!username) {
            content.logged    = true;            
            content.username  = '';
            content.firstname = '';
            await res.render('index.twig', content);     
        } else {       
            content.logged = false; 
        }
        
    } else {
        content.logged = false;
    }

    if (!username) {
        content.logged = false;
        res.render('index.twig', content);
    } else {
        const Users = await User.findOne({where: {Name: username}})
        if (!Users) {
            content.logged = false;
            console.log(Users);
            res.render('index.twig', content);
        } else {
            if (username === Users.Name) {
                console.log('True user name :', Users.Name);                
                if (Users.Password) {
                    console.log('user password: ', password);
                    console.log('hash password: ', Users.Password);
                    const comparePassword = await bcrypt.compare(password, Users.Password)
                    console.log(comparePassword)
                    if (comparePassword) {
                        if ((operMode=== 'on' && Users.RoleId===1) || operMode=== 'off') {
                            content.logged    = true;
                            content.username  = Users.Name;
                            content.firstname = Users.Descr;
                            console.log('Good password and role!');
                        } else {
                            content.logged = false;
                            console.log('Wrong role!');
                        }
                    } else {                        
                        content.logged = false;
                        console.log('Wrong password!');
                    }
                    res.render('index.twig', content);
                } else {
                    content.logged    = true;
                    content.username  = Users.Name;
                    content.firstname = Users.Descr;
                    console.log('Empty password');
                    res.render('index.twig', content);
                }
            } else {
                content.logged = false;
            }
        }
    }
}
//Users/////////////////////////////////////////////
exports.getUsers = async function(req, res) {
    console.log(dateNow(),'>>getUsers()...');

    if (!req.body) return res.sendStatus(400);

    try {
        // const data = await User.findAll({raw:true})
        // await res.send(data);
        const data = await sequelize.query(
            `SELECT "Users"."id", "Users"."Name", "Users"."Descr", "Users"."EAuth", "Users"."Show", "Users"."Password",
                "Users"."email", "Users"."AdmRole", "Users"."RoleId", "N"."Name" as "Role"
             FROM "Users"
             LEFT JOIN "Roles" as "N"
             on "Users"."RoleId" = "N"."id";`
        );
        await res.send(data[0]);         
    } catch(err) {
        console.log(err);
    }
}
exports.getListUsers = async function(req, res) {
    console.log(dateNow(),'>>getListUsers()...');

    if (!req.body) return res.sendStatus(400);

    try {
        const data = await User.findAll({raw:true})        
        await res.send(data);         
    } catch(err) {
        console.log(err);
    }
}
exports.getUser = async function(req, res) {
    console.log(dateNow(),'>>getUser()...');
    if (!req.body) return res.sendStatus(400);    

    const {id} = req.body;
    try {
        // const data = await User.findAll({raw:true})
        // await res.send(data);
        const data = await sequelize.query(
            `SELECT "Users"."id", "Users"."Name", "Users"."Descr", "Users"."EAuth", "Users"."Show",
                "Users"."Password", "Users"."email", "Users"."AdmRole", "Users"."RoleId", "N"."id" as "RoleId", 
                "N"."Name" as "Role"
             FROM "Users"
             LEFT JOIN "Roles" as "N"
             on "Users"."RoleId" = "N"."id"
             where "Users"."id" = `+ id +`;`
        );
        return await res.send(data[0]);         
    } catch(err) {
        console.log(err);
    }
}
exports.createUser = async function(req, res) {
    console.log(dateNow(),'>>CreateUser()...');

    if (!req.body) return res.sendStatus(400);
    const {Name, Descr, Password, RoleId, EAuth, Show} = req.body;

    const hash = await hashPassword(Password,10);

    try {                
        const result = await User.count();
        console.log('User count: ',result);
        if (result === 0) {            
            await User.create({
                Name    : Name,
                Descr   : Descr,
                Password : hash,
                RoleId  : 1,
                EAuth   : true,
                Show    : true,
                AdmRole : true
            });
        } else {
            try {
                const user = await User.create({
                    Name    : Name,
                    Descr   : Descr,
                    Password : hash,
                    RoleId  : RoleId,
                    EAuth   : EAuth,
                    Show    : Show,
                    AdmRole : false
                })
                console.log(user);
                return await res.json("Success");
            } catch(err) {
                console.log(err);
            }
        }
    } catch (err){
        console.log(err);
    }
}
exports.updateUser = async function(req, res) {
    console.log(dateNow(),'>>updateUser()...');
    
    if (!req.body) return res.sendStatus(400);     

    let { id, Name, Descr, email, Password, EAuth, Show, RoleId}  = req.body;  

    const hash = await hashPassword(Password,10);

    try {
        const data = await User.update({ 
            Name     : Name, 
            Descr    : Descr,
            email    : email,
            Password : hash,
            EAuth    : EAuth,
            Show     : Show,
            RoleId   : RoleId
        }, {
            where: {id: id}
        })
        // console.log(data);
        return await res.json(data); 
    } catch(err) {
        console.log(err); 
    }   
}
exports.deleteUser = async function(req, res) {
    console.log(dateNow(),'>>deleteUser()...');
    if (!req.body) return res.sendStatus(400);
    const {id} = req.body;
    try {            
        const data = await User.destroy({where: {id: id, AdmRole: false}});

        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}
exports.getRoles = async function(req, res) {
    console.log(dateNow(),'getRoles()...');
    if (!req.body) return res.sendStatus(400);
    try {
        const data = await Role.findAll({raw:true});
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createRole = async function(req, res) {
    console.log(dateNow(),'>>CreateRole()...');

    if (!req.body) return res.sendStatus(400);
    const { Name } = req.body;
    
    try {                     
        let data =           
            await Role.create({
                Name    : Name 
            });

        return await res.json(data);   
    } catch (err){
        console.log(err);
    }
}
exports.deleteRole = async function(req, res) {
    console.log(dateNow(), '>>deleteRole()...');
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;
        const data = await Role.destroy({where: {id: id}});

        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}
//Config//////////////////////////////////////////////
exports.getConfig = async function(req, res) {
    console.log(dateNow(),'>>getConfig()...');

    if (!req.body) return res.sendStatus(400);
    try {
        const  data = await Config.findAll({raw:true});
        //console.log(data);
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createObject = async function(req, res) {
    console.log(dateNow(),'>>createConfig...');

    if (!req.body) return res.sendStatus(400);
    const { data } = req.body;
    
    try {                     
        let result =           
            await Config.create({
                state   : 1,
                data    : data
            });

        return await res.json(result);   
    } catch (err){
        console.log(err);
    }
}
exports.deleteObject = async function(req, res) {
    console.log(dateNow(),'>>deleteConfig()...');
    if (!req.body) return res.sendStatus(400);

    const {id} = req.body;

    //check the previous state=1 !

    try {    
        const result = await Config.update({ 
            state : 2                     
        }, {
            where: {id: id}
        })
        return await res.json(result); 
    } catch(err) {
        console.log(err);
    }
}
exports.editObject = async function(req, res) {
    console.log(dateNow(),'>>editObject()...');
    
    if (!req.body) return res.sendStatus(400);     
    const { id, data }  = req.body;  

    //check the previous state=1 !!!

    try {
        const result = await Config.update({ 
            state : 3,
            data  : data            
        }, {
            where: {id: id}
        })        
        return await res.json(result); 
    } catch(err) {
        console.log(err); 
    }   
}
exports.getObject = async function(req, res) {
    console.log(dateNow(),'>>getObject()...');
    if (!req.body) return res.sendStatus(400);    

    const {id} = req.body;
    try {                          
        const data = await Config.findOne({ where: { id: id }});        
        return await res.send(data);         
    } catch(err) {
        console.log(err);
    }
}
exports.checkObject = async function(req, res) {
    console.log(dateNow(),'>>checkObject()...');
    if (!req.body) return res.sendStatus(400);    

    const {typeId, textId} = req.body;
    try {
        const data = await sequelize.query(
            `SELECT *
             FROM "`+typeId+`s"              
             WHERE "name"='`+textId+`';`         
        );
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
        return await res.send('0');    
    }
}
exports.updateConfig = async function(req, res) {
    console.log(dateNow(), '>>updateConfig()...');
    if (!req.body) return res.sendStatus(400);

    let refColumns = {
        id   : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name : {type: DataTypes.STRING(150)},
        number : {type: DataTypes.STRING(9)},
        date : {type: DataTypes.DATE}
    }

    let data;
    try {                          
        data = await Config.findAll({ where: { state: [1,2,3] }});                        
    } catch(err) {
        console.log(err);
        return await res.send('0');
    }
    
    for (const row of data) {    
        const strJson  = row.data;          
        const Elements = await JSON.parse(strJson);      
        const objectId = Elements.textId;                        
        const typeId   = Elements.typeId;

        if (typeId==='Document') { 
            delete refColumns['name'];            
        } else {    
            delete refColumns['number'];
            delete refColumns['date'];   
            if (Elements.nameLength==='0') {                
                delete refColumns['name'];  
            } else {
                refColumns['name'] = {type: DataTypes.STRING(Elements.nameLength)};
            }                            
        } 

        const reqlist = await Requisite.findAll({ where: { owner: row.id } });                            
        for (const row of reqlist) { 
            const strJson  = row.data; 
            const Elements = await JSON.parse(strJson);  
            if (Elements.type === 'String') {
                if (Elements.length === 0) {
                    refColumns[Elements.textId] = {type: DataTypes.STRING}; 
                } else {
                    refColumns[Elements.textId] = {type: DataTypes.STRING(Elements.length)}; 
                }                                              
            } else if (Elements.type === 'Number') {
                if (Elements.accuracy === 0) {
                    refColumns[Elements.textId] = {type: DataTypes.INTEGER};     
                } else {
                    refColumns[Elements.textId] = {type: DataTypes.DECIMAL(14, Elements.accuracy)};  
                }
            } else if (Elements.type === 'Boolean') {
                refColumns[Elements.textId] = {type: DataTypes.BOOLEAN};  
            } else if (Elements.type === 'Date') {
                refColumns[Elements.textId] = {type: DataTypes.DATE};  
            } else {
                refColumns[Elements.type] = {type: DataTypes.INTEGER};  
            }
        }  
        
        if (row.state === 0) {
            continue;
        } else if (row.state === 1) {               
            if (typeId==='Subsystem') {            
                try {
                    const elem = await Subsystem.create({   
                        id  : row.id,                     
                        name: objectId
                    });
                    console.log('Create element:', elem);                       
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }    
            } else if (typeId==='Constant') {                                 
                try {
                    const elem = await Constant.create({   
                        id  : row.id,              
                        name: objectId,
                        type: Elements.constType
                    });
                    console.log('Create element:', elem);                       
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }  
            } else if (typeId==='Module') { 
                try {
                    const elem = await Module.create({   
                        id  :  row.id,    
                        name:  objectId,     
                        xbase64: ''                        
                    });
                    console.log('Create element:', elem);                       
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }
            } else {                      
                try {
                    const EvaObject = sequelize.define(objectId, refColumns);
                    console.log('Create table:', EvaObject);   
                    await EvaObject.sync({alter: true});
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                } 
            }
            try {
                const result = await Config.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table:', result);                           
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }
        } else if (row.state === 2) {  
            if (typeId==='Subsystem') {            
                try {
                    const count = await Subsystem.destroy({where: {id: row.id}});                    
                    console.log('Deleted row(s):', count);                     
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }    
            } else if (typeId==='Constant') {                                  
                try {
                    const count = await Constant.destroy({where: {id: row.id}});
                   
                    console.log('Deleted row(s):', count);                      
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }  
            } else if (typeId==='Module') {                                  
                try {
                    const count = await Module.destroy({where: {id: row.id}});
                   
                    console.log('Deleted row(s):', count);                      
                } catch(err) {
                    console.log(err);
                }                        
            } else {         
                try { 
                    await sequelize.query('DROP TABLE IF EXISTS "'+objectId+'s";');
                    console.log('Deleted table:', objectId);                           
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }
            }    
            try {                                        
                const count = await Config.destroy({where: {id: row.id}});
                console.log('Deleted row(s):', count);
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }                
        } else if (row.state === 3) {  
            if (typeId==='Subsystem') {            
                try {
                    const count = await Subsystem.update({ 
                        name : objectId                    
                    }, {
                        where: {id: row.id}
                    });                    
                    console.log('Update row(s): '+count);                     
                } catch(err) {
                    console.log(err);
                }    
            } else if (typeId==='Constant') {    
                if (Elements.constType.split('.')[0]==='Reference') {
                    value = '';
                } else {
                    value = Elements.value;
                }
                try {
                    const count = await Constant.update({
                        name  : objectId,
                        type  : Elements.constType,
                        value : value             
                    }, {
                        where: {id: row.id}
                    });                                               
                    console.log('Update row(s):', count);                      
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }   
            } else if (typeId==='Module') {                                  
                try {
                    const count = await Module.update({
                        name : objectId,
                        xbase64  :''                
                    }, {
                        where: {id: row.id}
                    });                                               
                    console.log('Update row(s):', count);                      
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }                        
            } else {                                            
                try {                    
                    const EvaObject = sequelize.define(objectId, refColumns);
                    console.log('Create table:', EvaObject);   
                    await EvaObject.sync({ alter: true });                    
                } catch(err) {
                    console.log(err);
                    return await res.send('0');
                }  
            }
            console.log('>>Config.update()...');         
            try {
                const result = await Config.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table:', result);                           
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }
        }    
    }

    try {                          
        data = await TabPart.findAll({ where: { state: [1,2,3] }});   
        console.log(data);                     
    } catch(err) {
        console.log(err);
        return await res.send('0');
    }
    
    refColumns = {
        id   : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        owner: {type: DataTypes.INTEGER}
    }

    for (const row of data) {    
        const strJson  = row.data;          
        const Elements = await JSON.parse(strJson);      
        //const owner    = Elements.owner; 
        const objectId = Elements.owner+'.'+Elements.textId;                        
        const synonum  = Elements.synonum;
        
        const reqlist = await TabPartReq.findAll({ where: { owner: row.id } });                            
        for (const row of reqlist) { 
            const strJson  = row.data; 
            const Elements = await JSON.parse(strJson);  
            if (Elements.type === 'String') {
                if (Elements.length === 0) {
                    refColumns[Elements.textId] = {type: DataTypes.STRING}; 
                } else {
                    refColumns[Elements.textId] = {type: DataTypes.STRING(Elements.length)}; 
                }                                              
            } else if (Elements.type === 'Number') {
                if (Elements.accuracy === 0) {
                    refColumns[Elements.textId] = {type: DataTypes.INTEGER};     
                } else {
                    refColumns[Elements.textId] = {type: DataTypes.DECIMAL(14, Elements.accuracy)};  
                }
            } else if (Elements.type === 'Boolean') {
                refColumns[Elements.textId] = {type: DataTypes.BOOLEAN};  
            } else if (Elements.type === 'Date') {
                refColumns[Elements.textId] = {type: DataTypes.DATE};  
            } else {
                refColumns[Elements.type] = {type: DataTypes.INTEGER};  
            }
        } 

        if (row.state === 0) {
            continue;
        } else if (row.state === 1) {                                                                                                    
            try {
                const EvaObject = sequelize.define(objectId, refColumns);
                console.log('Create table:', EvaObject);   
                await EvaObject.sync({alter: true});
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }             
            try {
                const result = await TabPart.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table:', result);                           
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }
        } else if (row.state === 2) {                                  
            try { 
                await sequelize.query('DROP TABLE IF EXISTS "'+objectId+'s";');
                console.log('Deleted table:', objectId);                           
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }           
            try {                                        
                const count = await TabPart.destroy({where: {id: row.id}});
                console.log('Deleted row(s):', count);
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }                
        } else if (row.state === 3) {                                                                                          
            try {                    
                const EvaObject = sequelize.define(objectId, refColumns);
                console.log('Create table:', EvaObject);   
                await EvaObject.sync({ alter: true });                    
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }              
            console.log(dateNow(), '>>TabPart.update()...');         
            try {
                const result = await TabPart.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table:', result);                           
            } catch(err) {
                console.log(err);
                return await res.send('0');
            }
        }    
    }

    return await res.send('1');
}
exports.getSubsystems = async function(req, res) {
    console.log(dateNow(),'>>getSubsystems()...');
    if (!req.body) return res.sendStatus(400);    
    
    try {
        const data = await Subsystem.findAll({raw:true})
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.getReqs = async function(req, res) {
    console.log(dateNow(),'>>getReqs()...');
    if (!req.body) return res.sendStatus(400);

    const { owner } = req.body;

    try {
        const  data = await Requisite.findAll({ where: { owner: owner }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.getReq = async function(req, res) {
    console.log(dateNow(),'>>getReq()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {
        const  data = await Requisite.findOne({ where: { id: id }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createReq = async function(req, res) {
    console.log(dateNow(),'>>createReq()...');
    if (!req.body) return res.sendStatus(400);

    const { owner, data } = req.body;
    
    try {                     
        const result = await Requisite.create({     
                owner : owner,           
                data  : data
        });
        return await res.json(result);   
    } catch (err) {
        console.log(err);
    }
}
exports.deleteReq = async function(req, res) {
    console.log(dateNow(),'>>deleteReq()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {    
        const result = await Requisite.destroy(
        {
            where: {id : id}
        })
        return await res.json(result); 
    } catch(err) {
        console.log(err);
    }
}
exports.editReq = async function(req, res) {
    console.log(dateNow(),'>>editReq()...');    
    if (!req.body) return res.sendStatus(400);     

    const { id, data }  = req.body;  

    try {
        const result = await Requisite.update({             
            data  : data            
        }, {
            where: {id : id}
        })        
        return await res.json(result); 
    } catch(err) {
        console.log(err); 
    }   
}
exports.getTabparts = async function(req, res) {
    console.log(dateNow(),'>>getTabParts()...');
    if (!req.body) return res.sendStatus(400);

    const { owner } = req.body;

    try {
        const  data = await TabPart.findAll({ where: { owner: owner }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.getTabpart = async function(req, res) {
    console.log(dateNow(),'>>getTabPart()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {
        const data = await TabPart.findOne({ where: { id: id }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createTabpart = async function(req, res) {
    console.log(dateNow(),'>>createTabPart()...');
    if (!req.body) return res.sendStatus(400);

    const { owner, data } = req.body;
    
    try {                     
        const result = await TabPart.create({     
                owner : owner, 
                state : 1,          
                data  : data
        });
        return await res.json(result);   
    } catch (err) {
        console.log(err);
    }
}
exports.deleteTabpart = async function(req, res) {
    console.log(dateNow(),'>>deleteTabPart()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {    
        const result = await TabPart.update({ 
            state : 2                     
        }, {
            where: {id: id}
        })
        return await res.json(result); 
    } catch(err) {
        console.log(err);
    }
}
exports.editTabpart = async function(req, res) {
    console.log(dateNow(),'>>editTabPart()...');    
    if (!req.body) return res.sendStatus(400);     

    const { id, data }  = req.body;  

    try {
        const result = await TabPart.update({ 
            state : 3,
            data  : data            
        }, {
            where: {id: id}
        })        
        return await res.json(result); 
    } catch(err) {
        console.log(err); 
    }   
}
exports.getTabPartReqs = async function(req, res) {
    console.log(dateNow(),'>>getTabPartReqs()...');
    if (!req.body) return res.sendStatus(400);

    const { owner } = req.body;

    try {
        const  data = await TabPartReq.findAll({ where: { owner: owner }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.getTabPartReq = async function(req, res) {
    console.log(dateNow(),'>>getTabPartReq()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {
        const  data = await TabPartReq.findOne({ where: { id: id }});        
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createTabPartReq = async function(req, res) {
    console.log(dateNow(),'>>createTabPartReq()...');
    if (!req.body) return res.sendStatus(400);

    const { owner, data } = req.body;
    
    try {                     
        const result = await TabPartReq.create({     
                owner : owner,           
                data  : data
        });
        return await res.json(result);   
    } catch (err) {
        console.log(err);
    }
}
exports.deleteTabPartReq = async function(req, res) {
    console.log(dateNow(),'>>deleteTabPartReq()...');
    if (!req.body) return res.sendStatus(400);

    const { id } = req.body;

    try {    
        const result = await TabPartReq.destroy(
        {
            where: {id : id}
        })
        return await res.json(result); 
    } catch(err) {
        console.log(err);
    }
}
exports.editTabPartReq = async function(req, res) {
    console.log(dateNow(),'>>editTabPartReq()...');    
    if (!req.body) return res.sendStatus(400);     

    const { id, data }  = req.body;  

    try {
        const result = await TabPartReq.update({             
            data  : data            
        }, {
            where: {id : id}
        })        
        return await res.json(result); 
    } catch(err) {
        console.log(err); 
    }   
}
//eva-app/////////////////////////////////////////
exports.getReferences = async function(req, res) {
    console.log(dateNow(),'>>getReferences()...');
    if (!req.body) return res.sendStatus(400);
    
    const {textId, owner} = req.body;  
    let query = `SELECT * FROM "`+textId+`s";`
    if (owner) { query = `SELECT * FROM "`+textId+`s" WHERE "owner"=`+owner+`;`}
    
    try {
        const data = await sequelize.query(query);
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
    }
}
exports.getReference = async function(req, res) {
    console.log(dateNow(),'>>getReference()...');
    if (!req.body) return res.sendStatus(400);
    
    const {textId, id} = req.body;    
    try {
        const data = await sequelize.query(
            `SELECT *
             FROM "`+textId+`s"              
             WHERE "id"=`+id+`;`         
        );
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
    }
}
exports.getRefColumns = async function(req, res) {
    console.log(dateNow(),'>>getRefColumns()...');
    if (!req.body) return res.sendStatus(400);
    
    const {textId} = req.body;    
    try {
        const data = await sequelize.query(
            `SELECT column_name, data_type, dtd_identifier 
             FROM information_schema.Columns
             WHERE table_schema = 'public' and table_name = '`+textId+`s'
               and not column_name ='updatedAt' and not column_name='createdAt' ;`         
        );
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
    }
}
exports.createReference = async function(req, res) {
    console.log(dateNow(),'>>createReference()...');
    if (!req.body) return res.sendStatus(400);

    const {textId} = req.body;   

    delete req.body["textId"];
    console.log('req.body:', typeof(req.body));

    try {
        // const now = Date.now()/1000.0;        
        // let data = await sequelize.query(
        //     `INSERT INTO "`+textId+`s" 
        //      VALUES (DEFAULT, '`+name+`', to_timestamp(`+now+`), to_timestamp(`+now+`));`
        // );

        let EvaObject = sequelize.define(textId, req.body);
        const data = await EvaObject.create(req.body);

        console.log('Create object:', data.id);
        return await res.json(data.id);
    } catch(err) {
        console.log(err);
    }
}
exports.updateReference = async function(req, res) {
    console.log(dateNow(),'>>updateReference()...');

    if (!req.body) return res.sendStatus(400);     

    const {textId, id} = req.body;  
    console.log('req.body:', req.body);

    let tmp ='';
    for (let elem of Object.keys(req.body)) {
        if(elem==='id'||elem==='textId'||elem==='createdAt'||elem==='updatedAt') {            
        } else {
            console.log(elem, typeof(req.body[elem]));
            if (typeof(req.body[elem]) ==='number') {
                tmp = tmp +` "`+ elem + `"=`+ req.body[elem]+`,`;
            } else {
                tmp = tmp +` "`+ elem + `"='`+ req.body[elem]+`',`;
            }
        }
    }
    // console.log('tmp:', tmp.slice(0,-1));
    try {
        let data = await sequelize.query(
            `UPDATE "`+textId+`s" SET `+tmp.slice(0,-1)+`
             WHERE "id"=`+id+`;`
        );
        console.log('Update object:', data);
        return await res.json(data); 
    } catch (err) {
        console.log(err); 
    }   
}
exports.deleteReference = async function(req, res) {
    console.log(dateNow(),'>>deleteReference()...');
    if (!req.body) return res.sendStatus(400);

    const {textId, id} = req.body;
    try {                      
        let data = await sequelize.query(
            `DELETE FROM "`+textId+`s" WHERE "id"=`+id+`;`
        );
        console.log('Delete object:', data[1]);                                  
        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}