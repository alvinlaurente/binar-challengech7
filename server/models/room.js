
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {    
          const { userGames } = models;
    
          userGameHistories.belongsTo(userGames, { foreignKey: 'userId', as: 'userData' });
        }
      }

  room.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    userId1: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    userId2: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    playerOne_choice: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['rock', 'paper', 'scissor']],
      },
    },
    playerTwo_choice: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['rock', 'paper', 'scissor']],
      },
    },
    playerOne_status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    playerTwo_status: {
      allowNull: false,
      type: Sequelize.STRING,
    },

 }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};