'use strict';

const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define(`Picture`, {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: `pictures`,
    timestamps: false,
    paranoid: false,
  });

  Picture.associate = (models) => {
    Picture.belongsTo(models.Offer, {as: Alias.OFFERS, foreignKey: `offerId`});
  };

  return Picture;
};
