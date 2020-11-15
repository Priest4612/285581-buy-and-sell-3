'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);
const {offerValidator, offerExists, commentValidator} = require(`../../middlewares`);

const route = new Router();

const offerRouter = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    return res.status(HttpStatusCode.OK)
      .json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const existOffer = offerService.findOne(offerId);

    if (!existOffer) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updateOffer = offerService.update(offerId, req.body);

    return res
      .status(HttpStatusCode.OK)
      .json(updateOffer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(offer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpStatusCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpStatusCode.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(comment);
  });
};


module.exports = {
  offerRouter,
};
