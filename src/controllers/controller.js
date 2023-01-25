const { User }     = require('../models/models.js');
const { content }  = require('../index.js');

exports.Auth = (req,res) => {
    content.logged = false;       
    res.render("index.twig", content); 
}  
exports.Signin = (req,res) => {

    if(!req.body) return res.sendStatus(400);     

    const username = req.body.username;

    User.findOne({where: {Name: username}}).then(Users => { 
              
        console.log('controller: ', Users.Name);          

        if(username === Users.Name) {
            content.logged    = true;
            content.username  = Users.Name;
            content.firstname = Users.Descr;
            content.lastname  = '';
        }
                
        res.render("index.twig", content);  

    }).catch(err=>console.log(err));       
} 
exports.getAll = (req, res, next) => {
    User.findAll({raw:true}).then(Users => { 
        // content.breadcrumbs = [{
        //     href : '#',
        //     text : 'root'
        // }];
        res.send(Users);       
        next();
    }).catch(err=>console.log(err));       
}
exports.getOne = (req, res, next) => {
   
}
exports.Create = (req, res) => {

    if(!req.body) return res.sendStatus(400);     
    const {Name, Descr, RolesID, EAuth, Show} = req.body;       
    //console.log(new Date(), 'body', req.body);   
    let AdmRole;
    User.findAll({raw:true}).then(Users => { 
        if(Users) {
            AdmRole = false;  
        }else{
            AdmRole = true;                              
        }
    }).catch(err=>console.log(err));   
        
    User.findOne({where: {Name: Name}})
    .then(Users => {    
        //console.log('Users', Users);    
         if(Users) {
            console.log('duble user ',Users.Name); 
            console.log('Name ',Name); 
            if(Users.Name===Name) {       
                return   res.json("error");
            }        
         }   
        
    })                                     
    .catch(err=>console.log(err));  

    User.create({        
        Name    : Name, 
        Descr   : Descr,   
        RolesID : RolesID,           
        EAuth   : EAuth,  
        Show    : Show,
        AdmRole : AdmRole
    }).catch(err=>console.log(err));  
    
    return res.json("Success");

} 
exports.update = (req, res, next) => {
  
}
exports.Delete = (req, res) => {   

    if(!req.body) return res.sendStatus(400);     

    const {id} = req.body; 

    User.destroy({
        where: {id: id, AdmRole: false}
    }) 
    console.log('delete user id: ', id);

    // console.log('AdmRole user: ', AdmRole);  
}