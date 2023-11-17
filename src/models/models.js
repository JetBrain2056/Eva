const sequelize     = require('../db')
const { DataTypes } = require('sequelize')

//sequelize.sync({ force: true })
//console.log('DB DROP and CREATE all tables!')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true},
    Descr: {type: DataTypes.STRING},    
    EAuth: {type: DataTypes.BOOLEAN},
    Show: {type: DataTypes.BOOLEAN},
    Password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    AdmRole: {type: DataTypes.BOOLEAN, defaultValue: 'false'}
})

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true}
})

const Config = sequelize.define('Config', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.INTEGER},
    data:  {type: DataTypes.STRING}
})

const Subsystem = sequelize.define('Subsystem', {
    id:   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name: {type: DataTypes.STRING, unique: true},
    display: {type: DataTypes.BOOLEAN, defaultValue: 'true'}
})

const Constant = sequelize.define('Constant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name:  {type: DataTypes.STRING, unique: true},
    uuidType: {type: DataTypes.UUID, unique: true, defaultValue: sequelize.UUIDV4},
})

Role.hasOne(User)
User.belongsTo(Role)

// sequelize.sync({alter: true});
sequelize.sync();

module.exports = {
    User,
    Role,
    Config,
    Subsystem,
    Constant
}