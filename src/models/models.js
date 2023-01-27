const sequelize     = require('../db')
const { DataTypes } = require('sequelize')

sequelize.sync({ force: true })
//console.log('Все модели были успешно синхронизированы.')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    Name: {type: DataTypes.STRING, unique: true},
    Descr: {type: DataTypes.STRING},
    RolesID: {type: DataTypes.INTEGER, defaultValue: 1},
    EAuth: {type: DataTypes.BOOLEAN},
    Show: {type: DataTypes.BOOLEAN},        
    Password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    AdmRole: {type: DataTypes.BOOLEAN, defaultValue: 'false'}
})

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING}
})

const Config = sequelize.define('Config', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}    
})

Role.hasOne(User)
User.belongsTo(Role)

module.exports = {
    User,
    Role,
    Config
}