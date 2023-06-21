import { DataTypes } from "sequelize";
import sequelize from '../config/data.config.js';

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;