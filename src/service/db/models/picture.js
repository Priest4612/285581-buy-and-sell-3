'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {

    static associate(models) {
      Picture.belongsTo(models.Offer, {as: Alias.OFFERS, foreignKey: `offerId`});
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
