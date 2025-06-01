const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional if you're supporting group or broadcast
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Message content is required',
      },
      len: {
        args: [1, 1000],
        msg: 'Message content must be between 1 and 1000 characters',
      },
    },
  },
  status: {
    type: DataTypes.ENUM('sent', 'delivered', 'read'),
    allowNull: false,
    defaultValue: 'sent',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Message;




// // Define the Message model
// const Message = sequelize.define('message', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   sender_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   receiver_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true, 
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM('sent', 'delivered', 'read'),
//     defaultValue: 'sent',
//   },
// }, {
//   timestamps: true, 
// });
// module.exports = Message;