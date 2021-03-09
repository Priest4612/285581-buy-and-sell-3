'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {

    static associate(models) {
      // define association here
    }
  }

  Picture.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Picture`,
    tableName: `pictures`,
    timestamps: false,
    paranoid: false,
  });
  return Picture;
};
