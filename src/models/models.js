const sequelize     = require('../db');
const { DataTypes } = require('sequelize');

//sequelize.sync({ force: true })
//console.log('DB DROP and CREATE all tables!')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(50)},
    Descr: {type: DataTypes.STRING(150)},    
    EAuth: {type: DataTypes.BOOLEAN},
    Show: {type: DataTypes.BOOLEAN},
    Password: {type: DataTypes.STRING(100)},
    email: {type: DataTypes.STRING(50)},
    AdmRole: {type: DataTypes.BOOLEAN, defaultValue: 'false'}
})

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(50)}
})

const Config = sequelize.define('Config', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.INTEGER},
    data:  {type: DataTypes.TEXT}
})

const Subsystem = sequelize.define('Subsystem', {
    id:   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name: {type: DataTypes.STRING(50)},
    display: {type: DataTypes.BOOLEAN, defaultValue: 'true'}
})

const Constant = sequelize.define('Constant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name:  {type: DataTypes.STRING(150)},
    type:  {type: DataTypes.STRING(50)},
    value : {type: DataTypes.STRING(250)}
})

const Module = sequelize.define('Module', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name:  {type: DataTypes.STRING},
    xbase64: {type: DataTypes.TEXT}
})

const Requisite = sequelize.define('Requisite', {
    id    : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
    owner : {type: DataTypes.INTEGER},
    data  : {type: DataTypes.TEXT}
})

const TabPart = sequelize.define('TabPart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    owner : {type: DataTypes.INTEGER},
    state : {type: DataTypes.INTEGER},
    data  : {type: DataTypes.TEXT}
})

const TabPartReq = sequelize.define('TabPartReq', {
    id    : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
    owner : {type: DataTypes.INTEGER}, 
    data  : {type: DataTypes.TEXT}
})

const Form = sequelize.define('Form', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name:  {type: DataTypes.STRING},
    xbase64: {type: DataTypes.TEXT}
})

const Owner = sequelize.define('Owner', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    owner    : {type: DataTypes.STRING},
    refName  : {type: DataTypes.STRING}
})

Role.hasMany(User);
User.belongsTo(Role);

sequelize.sync({alter: true});
console.log('DB UPDATE all tables!');

module.exports = {
    User,
    Role,
    Config,
    Subsystem,
    Constant,
    Module, 
    Requisite,
    TabPart,
    TabPartReq,
    Form,
    Owner
}