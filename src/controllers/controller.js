const { User, Role, Config, Subsystem, Constant } = require('../models/models.js');
const { content }       = require('../index.js');
const bcrypt            = require('bcrypt');
const sequelize         = require('../db');
const { DataTypes}      = require('sequelize');
const { v4: uuidv4 }    = require('uuid');
//const jwt              = require('jsonwebtoken');

const dateNow = (new Date(Date.now())).toLocaleString();

/* const generateJwt = (id, login, role) => {
     return jwt.sign(
         {id, login, role},
         process.env.SECRET_KEY,
         {expiresIn: '24h'}
     )
 } */

// exports.check = (req, res, next) => {
//     const token = generateJwt(req.user.id, req.user.login, req.user.role)
//     return res.json({token})
// }
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
exports.Auth = function(req,res) {
    console.log('>>Auth()...');
    if (!req.body) return res.sendStatus(400);
    content.logged = false;
    res.render('index.twig', content);
}
exports.Signin = async function(req, res) {
    console.log('>>Signin()...');
    if (!req.body) return res.sendStatus(400);

    //console.log('body: ', req.body);

    const operMode = req.body.operation_mode;

    if ( operMode=== 'on') {
        content.mode = true;
    } else if (operMode=== 'off') {
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
                console.log('true user name : ', Users.Name);
                if (Users.Password && Users.Password) {
                    console.log('user password: ', password);
                    console.log('hash password: ', Users.Password);
                    const comparePassword = await bcrypt.compare(password, Users.Password)
                    console.log(comparePassword)
                    if (!comparePassword) {
                        content.logged = false;
                        console.log('Wrong password!');
                    } else {
                        content.logged    = true;
                        content.username  = Users.Name;
                        content.firstname = Users.Descr;
                        console.log('Good password!');
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
exports.getUser = async function(req, res) {

    if (!req.body) return res.sendStatus(400);

    // console.log(req);

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
    console.log('>>CreateUser...');

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
    console.log('>>updateUser...');
    
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
    console.log('>>deleteUser...');
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;
        const data = await User.destroy({where: {id: id, AdmRole: false}});

        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}
exports.getRoles = async function(req, res) {
    console.log('getRoles()...');
    try {
        const data = await Role.findAll({raw:true});
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createRole = async function(req, res) {
    console.log('>>CreateRole...');

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
    console.log(dateNow, '>>deleteRole()...');
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
    console.log(dateNow,'>>getConfig()...');
    try {
        const  data = await Config.findAll({raw:true});
        //console.log(data);
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createConfig = async function(req, res) {
    console.log(dateNow,'>>createConfig...');

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
exports.deleteConfig = async function(req, res) {
    console.log(dateNow,'>>deleteConfig()...');
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;

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
    console.log(dateNow,'>>editObject...');
    
    if (!req.body) return res.sendStatus(400);     
    const { id, data }  = req.body;  

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
    console.log(dateNow,'>>getObject()...');
    if (!req.body) return res.sendStatus(400);    

    const {id} = req.body;
    try {
  
        const data = await sequelize.query(
            `SELECT "Configs"."id", "Configs"."data"
             FROM "Configs"
             Where "Configs"."id" = `+ id +`;`
        );
        return await res.send(data[0]); 
        
    } catch(err) {
        console.log(err);
    }
}
exports.updateConfig = async function(req, res) {
    console.log(dateNow, '>>updateConfig(365)...');
    if (!req.body) return res.sendStatus(400);

    let refColumns = {id  : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},                  
                      name: {type: DataTypes.STRING}}; 

    for (let row of req.body) {        
        let objectId = row.textId;        
        
        console.log(row);
        let typeId = row.typeId;
        
        if (row.state === 0) {
            continue;
        } else if (row.state === 1) {               
            if (typeId==='Subsystem') {            
                try {
                    const elem = await Subsystem.create({   
                        id  : row.id,                     
                        name: objectId
                    });
                    console.log('Create element: '+elem);                       
                } catch(err) {
                    console.log(err);
                }    
            } else if (typeId==='Constant') {   
                const uuid = uuidv4();                 
                try {
                    const elem = await Constant.create({   
                        id  :  row.id,              
                        name: objectId,
                        uuidType: uuid
                    });
                    console.log('Create element: '+elem);                       
                } catch(err) {
                    console.log(err);
                }                    
            } else {                    
                try {
                    const EvaObject = sequelize.define(objectId, refColumns);
                    console.log('Create table: '+EvaObject);   
                    await EvaObject.sync({alter: true});
                } catch(err) {
                    console.log(err);
                }        
            }
            try {
                const result = await Config.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table: '+result);                           
            } catch(err) {
                console.log(err);
            }
        } else if (row.state === 2) {  
            if (typeId==='Subsystem') {            
                try {
                    const count = await Subsystem.destroy({where: {name: objectId}});                    
                    console.log('Deleted row(s): '+count);                     
                } catch(err) {
                    console.log(err);
                }    
            } else if (typeId==='Constant') {                                  
                try {
                    const count = await Constant.destroy({where: {name: objectId}});
                   
                    console.log('Deleted row(s): '+count);                      
                } catch(err) {
                    console.log(err);
                }                    
            } else {         
                try { 
                    await sequelize.query('DROP TABLE IF EXISTS "' + objectId+'s";');
                    console.log('Deleted table: '+objectId);                           
                } catch(err) {
                    console.log(err);
                }
            }    
            try {                                        
                const count = await Config.destroy({where: {id: row.id}});
                console.log('Deleted row(s): '+count);
            } catch(err) {
                console.log(err);
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
                try {
                    const count = await Constant.update({
                        name : objectId                    
                    }, {
                        where: {id: row.id}
                    });                            
                   
                    console.log('Update row(s): '+count);                      
                } catch(err) {
                    console.log(err);
                }                    
            } else { 
                console.log('reqlist: '+row.reqlist);
                if (row.reqlist) {
                    for (let elem of Object.keys(row.reqlist)) {
                        refColumns[row.reqlist[elem]] = {type: DataTypes.STRING};
                    }
                    console.log(refColumns);
                }
                try {                    
                    const EvaObject = sequelize.define(objectId, refColumns);
                    console.log('Create table: '+EvaObject);   
                    await EvaObject.sync({ alter: true });                    
                } catch(err) {
                    console.log(err);
                }  
            }
            console.log('>>Config.update()...');
            try {
                const result = await Config.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                }) 
                console.log('Update table: '+result);                           
            } catch(err) {
                console.log(err);
            }
        }    
    }
   
}
exports.getSubsystems = async function(req, res) {
    console.log(dateNow,'>>getSubsystems()...');
    //if (!req.body) return res.sendStatus(400);    
    // console.log(req);
    try {
        const data = await Subsystem.findAll({raw:true})
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
//eva-app/////////////////////////////////
exports.getReferences = async function(req, res) {
    console.log(dateNow,'>>getReferences()...');
    if (!req.body) return res.sendStatus(400);
    //console.log(req.body);
    const {textId} = req.body;    
    try {
        const data = await sequelize.query(
            `SELECT *
             FROM "`+textId+`s" as "R";`         
        );
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
    }
}
exports.getReference = async function(req, res) {
    console.log(dateNow,'>>getReference()...');
    if (!req.body) return res.sendStatus(400);
    //console.log(req.body);
    const {textId, id} = req.body;    
    try {
        const data = await sequelize.query(
            `SELECT *
             FROM "`+textId+`s" as "R" 
             WHERE "R"."id"=`+id+`;`         
        );
        return await res.send(data[0]);        
    } catch(err) {
        console.log(err);
    }
}
exports.createReference = async function(req, res) {
    console.log(dateNow,'>>createReference(549)...');
    if (!req.body) return res.sendStatus(400);

    let refColumns = {id  : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},                  
                      name: {type: DataTypes.STRING}}; 
    
    const {textId, name, reqlist} = req.body;   

    // console.log('reqlist: '+reqlist);
    // if (reqlist) {
    //     for (let elem of Object.keys(reqlist)) {
    //         refColumns[reqlist[elem]] = {type: DataTypes.STRING};
    //     }
    //     console.log(refColumns);
    // }

    try {
        const now = Date.now()/1000.0;        
        let data = await sequelize.query(`INSERT INTO "`+textId+`s" 
                                          VALUES (DEFAULT, '`+name+`',to_timestamp(`+now+`),to_timestamp(`+now+`));`);

        // let EvaObject = sequelize.define(textId, refColumns);
        // const data = await EvaObject.create({
        //     name : name
        // });

        console.log('Create object: '+data);
        return await res.json(textId);
    } catch(err) {
        console.log(err);
    }
}
exports.updateReference = async function(req, res) {
    console.log(dateNow,'>>updateReference(583)...');

    if (!req.body) return res.sendStatus(400);     

    const {textId, id, name, reqlist} = req.body;  
    console.log('reqlist:',reqlist);
    // for (let elem of reqlist) {
    //     refColumns[elem.req1] = {type: DataTypes.STRING};
    // }
    console.log('refColumns: '+refColumns);
    try {
        let data = await sequelize.query(`UPDATE "`+textId+`s" SET "name" = '`+name+`'
                                          WHERE "id"=`+id+`;`);
        console.log('Update object:'+data);
        return await res.json(data); 
    } catch (err) {
        console.log(err); 
    }   
}
exports.deleteReference = async function(req, res) {
    console.log(dateNow,'>>deleteReference(603)...');
    if (!req.body) return res.sendStatus(400);
    const {textId, id} = req.body;
    try {                      
        let data = await sequelize.query(`DELETE FROM "`+textId+`s" 
                                           WHERE "id"=`+id+`;`);
        console.log('Delete object: ',data);                                  
        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}