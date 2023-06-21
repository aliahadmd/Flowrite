import { DataTypes } from "sequelize";
import sequelize from '../config/data.config.js';

const Admin = sequelize.define('Admin', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Admin;