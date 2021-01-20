'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);
const {offerValidator, offerExists, commentValidator} = require(`../../middlewares`);

const offerRouter = (app, offerService, commentService) => {
  const route = new Router();

  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await offerService.findPage({limit, offset});
    } else {
      result = await offerService.findAll(comments);
    }
    return res.status(HttpStatusCode.OK)
      .json(result);
  });

  route.get(`/category/:categoryId`, async (req, res) => {
    const {categoryId} = req.params;

    const result = await offerService.filterToCategory(categoryId);

    return res.status(HttpStatusCode.OK)
      .json(result);
  });

  route.get(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const {comments} = req.query;

    const offer = await offerService.findOne(offerId, comments);

    if (!offer) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(offer);
  });


  route.post(`/`, offerValidator, async (req, res) => {
    const offer = await offerService.create(req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, offerValidator, async (req, res) => {
    const {offerId} = req.params;

    const updated = await offerService.update(offerId, req.body);

    if (!updated) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpStatusCode.OK)
      .send(`Updated`);
  });

  route.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(offer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), async (req, res) => {
    const {offerId} = res.params;
    const comments = await commentService.findAll(offerId);

    res.status(HttpStatusCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), async (req, res) => {
    const {commentId} = req.params;
    const deleted = await commentService.drop(commentId);

    if (!deleted) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpStatusCode.OK)
      .json(deleted);
  });

  route.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offerId} = res.params;
    const comment = commentService.create(offerId, req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(comment);
  });
};


module.exports = {
  offerRouter,
};
