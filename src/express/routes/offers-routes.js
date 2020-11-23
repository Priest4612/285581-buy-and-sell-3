'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {PROJECT_DIR, UPLOAD_DIR} = require(`../../../settings`);
const IMAGES_DIR = `img`;

const uploadDirAbsolute = path.resolve(PROJECT_DIR, UPLOAD_DIR, IMAGES_DIR);

const {getLogger} = require(`../service/lib/logger`);
const logger = getLogger({name: `MAIN-ROUTER`});

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqeName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqeName}.${extension}`);
  }
});

const upload = multer({storage});

const api = require(`../api`).getAPI();
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));

offersRouter.get(`/add`, async (req, res) => {
  const apiCategoriesData = await api.getCategories();
  res.render(`offers/new-ticket`, {apiCategoriesData});
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category,
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (error) {
    logger.error(error.message);
    res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [apiOfferData, apiCategoriesData] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offers/ticket-edit`, {apiOfferData, apiCategoriesData});
});

offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = {
  offersRouter,
};
