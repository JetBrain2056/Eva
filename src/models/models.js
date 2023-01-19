const sequelize = require('../db')
const {DataTypes} = require('sequelize')

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
    AdmRole: {type: DataTypes.BOOLEAN}
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

//////////////////////////////////////////////////////////////////////////
  
async function role_create() {
    const result =  await Role.count()
    console.log('Role_count',result);

   if (result == 0) {
        try {
            Role.create({
                Name: 'Admin',
                })
            } catch (err) {}
    }
}
//role_create();

async function admin_create() {
    const result =  await User.count()
    console.log('User_count',result);

   if (result == 0) {
        try {
            User.create({
                Name: 'Admin',
                Descr: 'Admin',
                RolesID: 1,
                EAuth: 1,
                Show: 1
                })
            } catch (err) {}
    }
}
//admin_create();

//////////////////////////////////////////////////////////////////////////

module.exports = {
    User,
    Role,
    Config
}