const { User }     = require('../models/models.js');
const { content }  = require('./index.js');

exports.Auth = (req,res) => {
    content.logged = false;       
    res.render("index.twig", content); 
}  

exports.Signin = (req,res) => {

    if(!req.body) return res.sendStatus(400);     

    const username = req.body.username;

    User.findAll({raw:true}).then(Users => { 
        var objuser = Users[0];           
        console.log('controller: ', objuser.Name);          

        if(username == objuser.Name) {            
            content.logged    = true;
            content.username  = objuser.Name;
            content.firstname = objuser.Descr;
            content.lastname  = '';
        };
                
        res.render("index.twig", content);  

    }).catch(err=>console.log(err));       
} 

exports.getAll = (req, res, next) => {

    User.findAll({raw:true}).then(Users => { 

        content.breadcrumbs = [{
            href : '#',
            text : 'root'
        }];
        res.send(Users);  
        //res.redirect('/users');       

        next();
    }).catch(err=>console.log(err));       
}

exports.getOne = (req, res, next) => {
   
}

exports.create= (req, res, next) => {
    
}

exports.update = (req, res, next) => {
  
}

exports.delete = (req, res, next) => {
   
}