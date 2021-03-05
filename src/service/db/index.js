'use strict';

const fs = require(`fs`);
const path = require(`path`);

const {ServiceDir} = require(`../../constants`);

const generateModels = (sequelize, DataTypes) => {
  let models = {};
  const modelsFolderPath = ServiceDir.MODELS_PATH;

  fs.readdirSync(path.join(modelsFolderPath)).forEach((file) => {
    const model = require(path.join(modelsFolderPath, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
};


module.exports = generateModels;
