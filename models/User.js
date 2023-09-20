import { STRING , INTEGER} from 'sequelize';
import  db from '../config/database.js'; // Assuming you have a database.js file for database configuration

// Define the User model
const User = db.define('User', {
  // Define model attributes
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

export default User;
