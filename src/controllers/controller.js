const { User, Role } = require('../models/models.js');
const { content }    = require('../index.js');
const bcrypt         = require('bcrypt');
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

exports.Auth = (req,res) => {
    content.logged = false;       
    res.render("index.twig", content); 
}  
exports.Signin = (req,res) => {

    if(!req.body) return res.sendStatus(400);     

    User.count().then(result => {console.log('User count: ',result)

        if (result === 0) { 
            content.logged    = true;
            content.username  = '';
            content.firstname = '';
            res.render("index.twig", content);  
        }else{
            const username = req.body.username;
            const password = req.body.password;
            if (username === ''){
                content.logged = false;
                res.render("index.twig", content);  
            }else{
                User.findOne({where: {Name: username}}).then(Users => {
                    if(!Users) {
                        content.logged = false;
                    }else{
                        if (Users.Password !== null&&Users.Password !== ''){
                            console.log('user password: ', Users.Password);
                            let comparePassword = bcrypt.compareSync(password, Users.password)
                            if (!comparePassword) {
                                return next(res.send('Wrong password!'))
                            }
                        }
                        console.log('controller user: ', Users.Name);
                        if(username === Users.Name) {
                            content.logged    = true;
                            content.username  = Users.Name;
                            content.firstname = Users.Descr;
                            content.lastname  = '';
                        }                                
                    }
                    res.render('index.twig', content);
                }).catch(err=>console.log(err)); 
            } 
        }    
    })        
} 
exports.getAll = (req, res, next) => {
    User.findAll({raw:true}).then(Users => { 
        res.send(Users);       
        next();
    }).catch(err=>console.log(err));       
}

exports.getOne = (req, res, next) => {
   
}
exports.Create = (req, res) => {

    if(!req.body) return res.sendStatus(400);     
    const {Name, Descr, Password, RolesID, EAuth, Show} = req.body;       
      
    User.count().then(result => {console.log('User count: ',result)        
        if (result === 0) {                                
            Role.create({Name: 'Administrator'}).catch(err=>console.log(err));              
            User.create({
                Name    : 'Admin',
                Descr   : 'Admin',
                RolesID : 1,
                EAuth   : true,
                Show    : true,
                AdmRole : true
                }).catch(err=>console.log(err));              
        }else{
            User.create({        
                Name    : Name, 
                Descr   : Descr,  
                Password : Password, 
                RolesID : RolesID,           
                EAuth   : EAuth,  
                Show    : Show,
                AdmRole : false
            }).catch(err=>console.log(err));  
        }           
        return res.json("Success");
    })    
} 
exports.update = (req, res, next) => {
  
}
exports.Delete = (req, res) => {   

    if(!req.body) return res.sendStatus(400);     

    const {id} = req.body; 

    User.destroy({where: {id: id, AdmRole: false}})
    .then(res=>console.log(res))
    .catch(err=>console.log(err));  
}