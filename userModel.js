import database from "./database.js";
import { DataTypes } from "sequelize";

const User = database.define("users", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING(45),
        allowNull : false
    },
    email : {
        type : DataTypes.STRING(45),
        allowNull : false
    },
    password : {
        type : DataTypes.STRING(45),
        allowNull : false
    }
}, {
    timestamps : false
})

export default User;