'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const commentKeys = [`text`];

const commentValidator = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};


module.exports = {
  commentValidator,
};
