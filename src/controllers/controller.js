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
    res.render('index.twig', content); 
}  
exports.Signin = (req,res,next) => {

    if(!req.body) return res.sendStatus(400);     

    const username = req.body.username;
    const password = req.body.password;

    User.count().then(result => {
        
        console.log('User count: ',result)

        if (result === 0) { 
            content.logged    = true;
            content.username  = '';
            content.firstname = '';  
            res.render('index.twig', content);             
        }else{
            content.logged = false;
        }            
    })

    if (username === ''){
        content.logged = false;                              
        res.render('index.twig', content);            
    }else{
        User.findOne({where: {Name: username}}).then(Users => { 
            if(!Users) {
                content.logged = false;
                console.log(Users);   
                res.render('index.twig', content);                                    
            }else{                        
                if(username === Users.Name) {                          
                    console.log('true user name : ', Users.Name);
                    if (Users.Password !== null&&Users.Password !== ''){
                        console.log('user password: ', password);
                        console.log('hash password: ', Users.Password);
                        bcrypt.compare(password, Users.Password).then(comparePassword => {                                
                            console.log(comparePassword)                                
                            if (comparePassword === false) {                                    
                                content.logged = false;  
                                console.log('Wrong password!');                                                                                             
                            }else{                                                                          
                                content.logged    = true;
                                content.username  = Users.Name;
                                content.firstname = Users.Descr;      
                                console.log('Good password!');                                                                                                                                       
                            }    
                            res.render('index.twig', content);                              
                        }) 
                    }else{                                                                                                                                                                                                                                              
                        content.logged    = true;
                        content.username  = Users.Name;
                        content.firstname = Users.Descr;   
                        console.log('Empty password');                                                                                                           
                        res.render('index.twig', content);  
                    }                   
                }else{
                    content.logged = false;                            
                }                        
            }                                              
        }).catch(err=>console.log(err));                   
    }         
} 
exports.getAll = async (req, res, next) => {
    try {
        const users = await User.findAll({raw:true})
        await res.send(users);       
        next();
    } catch(e) {
        console.log(e); 
    }     
}
exports.getOne = (req, res, next) => {   
}
exports.Create = async (req, res) => {
    
    if(!req.body) return res.sendStatus(400);     
    const {Name, Descr, Password, RolesID, EAuth, Show} = req.body;  
    try{
        const hash = await hashPassword(Password,10);   
        console.log(hash);
        const result = await User.count();
        console.log('User count: ',result);              
        if (result === 0) {                                        
            await Role.create({Name: 'Administrator'});              
            await User.create({
                Name    : Name, 
                Descr   : Descr,
                Password : hash,
                RolesID : 1,
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
                    RolesID : RolesID,           
                    EAuth   : EAuth,  
                    Show    : Show,
                    AdmRole : false
                })
                console.log(user);
                return await res.json("Success"); 
            }catch(e){
                console.log(e); 
            } 
        }                           
    }catch(e){
        console.log(e);
    }     
} 
exports.Update = (req, res, next) => {  
}
exports.Delete = async (req, res) => {   
    console.log("Delete", req.body);
    try{    
        if(!req.body) return res.sendStatus(400);     

        const {id} = req.body; 
        const user = await User.destroy({where: {id: id, AdmRole: false}});                      
        
        return await res.json(user);  
    }catch(e){
        console.log(e);
    }
}  