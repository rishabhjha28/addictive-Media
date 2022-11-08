const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')

const Data = sequelize.define('Data',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    dob:{
        type:DataTypes.DATE,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fileLink:{
        type:DataTypes.STRING,
        allowNull:false
    },
    time:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})

Data.sync().then(result =>{
    console.log("DB is in sync")
}).catch(error=>{
    console.log("error")
})
module.exports = Data