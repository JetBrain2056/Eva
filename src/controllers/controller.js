const { User, Role, Config }    = require('../models/models.js');
const { content }       = require('../index.js');
const bcrypt            = require('bcrypt');
const sequelize         = require('../db');
const { DataTypes }     = require('sequelize');
//const jwt              = require('jsonwebtoken');

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
    content.logged = false;
    res.render('index.twig', content);
}
exports.Signin = async function(req, res) {

    if (!req.body) return res.sendStatus(400);

    console.log('body: ', req.body);

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
exports.getUsers = async function(req, res) {
    try {
        // const data = await User.findAll({raw:true})
        // await res.send(data);
        const data = await sequelize.query(
            'SELECT "Users"."id", "Users"."Name", "Users"."Descr", "Users"."EAuth", "Users"."Show", "Users"."Password", "Users"."email", "Users"."AdmRole", "Users"."RoleId", "N"."Name" as "Role" '
            +'FROM "Users"'
            +'LEFT JOIN "Roles" as "N"'
            +'on "Users"."RoleId" = "N"."id";'
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
            'SELECT "Users"."id", "Users"."Name", "Users"."Descr", "Users"."EAuth", "Users"."Show", "Users"."Password", "Users"."email", "Users"."AdmRole", "Users"."RoleId", "N"."id" as "RoleId", "N"."Name" as "Role" '
            +'FROM "Users"'
            +'LEFT JOIN "Roles" as "N"'
            +'on "Users"."RoleId" = "N"."id"'
            +'where "Users"."id" = '+ id +';'
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
    try {
        const data = await Role.findAll({raw:true})
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
    console.log('>>deleteRole...');
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;
        const data = await Role.destroy({where: {id: id}});

        return await res.json(data);
    } catch(err) {
        console.log(err);
    }
}
//Config//////////////////////////////////
exports.getConfig = async function(req, res) {
    try {
        const data = await Config.findAll({raw:true})
        await res.send(data);        
    } catch(err) {
        console.log(err);
    }
}
exports.createConfig = async function(req, res) {
    console.log('>>createConfig...');

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
    console.log('>>deleteConfig...');
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;
        // const data = await Config.destroy({where: {id: id}});
        // return await res.json(data);

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
    console.log('>>editObject...');
    
    if (!req.body) return res.sendStatus(400);     
    const { id, data }  = req.body;  

    try {
        const result = await Config.update({ 
            state : 1,
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
    console.log('>>getObject...');

    if (!req.body) return res.sendStatus(400);    

    const {id} = req.body;
    try {
  
        const data = await sequelize.query(
            'SELECT "Configs"."id", "Configs"."data"'
            +'FROM "Configs"'
            +'where "Configs"."id" = '+ id +';'
        );
        return await res.send(data[0]); 
        
    } catch(err) {
        console.log(err);
    }
}
exports.updateConfig = async function(req, res) {
    console.log('>>updateConfig...');
    if (!req.body) return res.sendStatus(400);

    for (let row of req.body) {        
        let tblId   = row.textId;        
        let columns = {id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}}; //
        
        console.log(row);

        let EvaObject;
        if (row.state === 0) {
            return;
        } else if (row.state === 1) {    
            try {
                EvaObject = sequelize.define(tblId, columns);

                const result = await Config.update({ 
                    state : 0                     
                }, {
                    where: {id: row.id}
                })
                console.log(EvaObject);            
            } catch(err) {
                console.log(err);
            }
        } else if (row.state === 2) {
            try {                
                        
                EvaObject = await Config.destroy({where: {id: row.id}});

                //await sequelize.destroy(tblId);
                await sequelize.dropSchema(tblId);
        
                //return await res.json(EvaObject);
            } catch(err) {
                console.log(err);
            }
        }
    }
    await sequelize.sync()
}