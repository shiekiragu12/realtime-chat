// const { DataTypes } = require('sequelize');
// const sequelize = require('../database');
// const bcrypt = require('bcrypt');

// const User = sequelize.define('user', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   full_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: {
//         msg: 'Full name is required'
//       },
//       len: {
//         args: [2, 50],
//         msg: 'Full name must be between 2 and 50 characters'
//       }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: {
//       msg: 'Email already exists'
//     },
//     validate: {
//       isEmail: {
//         msg: 'Please provide a valid email address'
//       },
//       notEmpty: {
//         msg: 'Email is required'
//       }
//     }
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     unique: {
//       msg: 'Phone number already exists'
//     },
//     validate: {
//       is: {
//         args: /^[0-9]{10,15}$/,
//         msg: 'Please provide a valid phone number'
//       }
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: {
//         msg: 'Password is required'
//       },
//       len: {
//         args: [8, 100],
//         msg: 'Password must be at least 8 characters'
//       }
//     }
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, {
//   hooks: {
//     beforeSave: async (user) => {
//       if (user.changed('password')) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//       }
//     }
//   }
// });

// // Instance method to compare passwords
// // User.prototype.comparePassword = async function(candidatePassword) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = User;

// module.exports = {
//   attributes: {
//     full_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
// };








const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = User;
