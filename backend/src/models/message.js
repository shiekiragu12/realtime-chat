const { DataTypes } = require('sequelize');
const sequelize = require('../database');




module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read'),
      defaultValue: 'sent',
    },
  }, {
    tableName: 'messages',
    timestamps: true,
  });

  // Message.associate = function(models) {
  //   Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
  //   Message.belongsTo(models.User, { foreignKey: 'receiver_id', as: 'receiver' });
  // };

  return Message;
};


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
//     validate: {
//       notEmpty: {
//         msg: 'Message content is required',
//       },
//       len: {
//         args: [1, 1000],
//         msg: 'Message content must be between 1 and 1000 characters',
//       },
//     },
//   },
//   status: {
//     type: DataTypes.ENUM('sent', 'delivered', 'read'),
//     allowNull: false,
//     defaultValue: 'sent',
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   }
// });

// module.exports = Message;









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