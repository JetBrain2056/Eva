const { User, Role }    = require('../models/models.js');
const { content, Lang } = require('../index.js');
const bcrypt            = require('bcrypt');
// const { Op, Sequelize, QueryTypes} = require("sequelize");
// const sequelize         = require('../db');
//const jwt            = require('jsonwebtoken');

// const generateJwt = (id, login, role) => {
//     return jwt.sign(
//         {id, login, role},
//         process.env.SECRET_KEY,
//         {expiresIn: '24h'}
//     )
// }

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
exports.Lang = (req,res) => {
    if (!req.body) return res.sendStatus(400);
    const {lang} = req.body;
    //Lang = 'rus';
}
exports.Auth = (req,res) => {
    content.logged = false;
    res.render('index.twig', content);
}
exports.Signin = async (req,res,next) => {

    if (!req.body) return res.sendStatus(400);

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
exports.getUsers = async (req, res, next) => {
    try {
        const data = await User.findAll({raw:true})
        await res.send(data);
        // const data = await sequelize.query(
        //     'SELECT "Users"."*", "N"."Name" as "Role" '
        //     +'FROM "Users"'
        //     +'LEFT JOIN "Roles" as "N"'
        //     +'on "Users"."roleId" = "N"."id";'
        // );
        // await res.send(data[0]); 
        next();
    } catch(err) {
        console.log(err);
    }
}
exports.getOne = (req, res, next) => {
}
exports.Create = async (req, res) => {

    if (!req.body) return res.sendStatus(400);
    const {Name, Descr, Password, RoleId, EAuth, Show} = req.body;
    try {
        const hash = await hashPassword(Password,10);
        console.log(hash);
        const result = await User.count();
        console.log('User count: ',result);
        if (result === 0) {
            // await Role.create({Name: 'Administrator'});
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
exports.Update = async (req, res, next) => {
    console.log('Update', req.body);
    
    if (!req.body) return res.sendStatus(400);     

    let { id, name, descr}  = req.body;  

    try {
        const data = await User.update({ 
            Name: name, 
            Descr: descr
        }, {
            where: {id: id}
        })
        console.log(data);
        return await res.json("Success"); 
    } catch(err) {
        console.log(err); 
    }   
}
exports.Delete = async (req, res) => {
    console.log('Delete', req.body);
    try {
        if (!req.body) return res.sendStatus(400);

        const {id} = req.body;
        const user = await User.destroy({where: {id: id, AdmRole: false}});

        return await res.json(user);
    } catch(err) {
        console.log(err);
    }
}
exports.getRoles = async (req, res, next) => {
    try {
        const data = await Role.findAll({raw:true})
        await res.send(data);
        next();
    } catch(err) {
        console.log(err);
    }
}