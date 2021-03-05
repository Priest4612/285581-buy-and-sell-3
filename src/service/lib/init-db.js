'use strict';

const defineModels = require(`../db`);
const Alias = require(`../db/alias`);
const {DataTypes} = require(`sequelize`);


module.exports = async (sequelize, {offerTypes, categories, users, offers}) => {
  const {Category, Offer, OfferType, User} = defineModels(sequelize, DataTypes);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(categories);

  const categoryIdByName = categoryModels.reduce((acc, next) => ({
    [next.name]: next.id,
    ...acc
  }), {});

  await Promise.all([
    await OfferType.bulkCreate(offerTypes),
    await User.bulkCreate(users),
    offers.map(async (offer) => {
      const createdOffer = await Offer.create(offer, {include: [Alias.PICTURES, Alias.COMMENTS]});
      await createdOffer.addCategories(
          offer.categories.map((name) => categoryIdByName[name])
      );
    })
  ]);
};
