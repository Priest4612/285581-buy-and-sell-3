'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
    .min(10)
    .max(100)
    .required(),
  sentences: Joi.string()
    .min(50)
    .max(1000)
    .required(),
  sum: Joi.number()
    .min(100)
    .required(),
});
