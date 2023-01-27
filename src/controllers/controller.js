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

 async function hashPassword(password, saltRounds = 10) {
    try {
      // Generate a salt
      const salt =  await bcrypt.genSalt(saltRounds)
  
      // Hash password
      const hash =  await bcrypt.hash(password, salt)
      console.log('hash: ', hash)
      return hash
    } catch (error) {
      console.log(error)
    }
  
    // Return null if error
    return null
  }

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
                    content.logged    = false;
                    }else{
                        console.log('controller user: ', Users.Name);
                        if(username === Users.Name) {                          
                            if (Users.Password !== null&&Users.Password !== ''){
                                console.log('user password: ', password);
                                console.log('hash password: ', Users.Password);
                                bcrypt.compare(password, Users.Password).then(comparePassword => {                                
                                    console.log(comparePassword)                                
                                    if (comparePassword===false) {                                    
                                        content.logged    = false;  
                                        console.log('Wrong password');                                    
                                    }else{    
                                        console.log('User login true: ', Users.Name);
                                        if(username === Users.Name) {
                                            content.logged    = true;
                                            content.username  = Users.Name;
                                            content.firstname = Users.Descr;
                                            content.lastname  = '';
                                        }  
                                    }    
                                }) 
                            }else{                                                                                                                                                                                                                                              
                                content.logged    = true;
                                content.username  = Users.Name;
                                content.firstname = Users.Descr;
                                content.lastname  = '';
                            }
                        }else{
                            content.logged    = false;
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
exports.Create = async (req, res) => {

    if(!req.body) return res.sendStatus(400);     
    const {Name, Descr, Password, RolesID, EAuth, Show} = req.body;  

    //const hash = {};
    if(Password !==''){        
        //hash = await hashPassword(Password,10)
    }       
    const hash = await hashPassword(Password,10)
    User.count().then(result => {console.log('User count: ',result)   
        if (result === 0) {                                        
            Role.create({Name: 'Administrator'}).catch(err=>console.log(err));              
            User.create({
                Name    : Name, //'Admin',
                Descr   : Descr,//'Admin',
                Password : hash,
                RolesID : 1,
                EAuth   : true,
                Show    : true,
                AdmRole : true
                }).catch(err=>console.log(err));              
        }else{
            User.create({        
                Name    : Name, 
                Descr   : Descr,  
                Password : hash,
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