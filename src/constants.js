'use strict';

const resolvePath = require(`path`).resolve;
const {PROJECT_DIR} = require(`../settings`);

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const EXPRESS_PATH = resolvePath(PROJECT_DIR, `src/express`);

const FrontDir = {
  PUBLIC_DIR: resolvePath(EXPRESS_PATH, `public`),
  TEMPLATES_DIR: resolvePath(EXPRESS_PATH, `templates`),
  UPLOAD_DIR: resolvePath(EXPRESS_PATH, `upload`),
  UPLOAD_IMAGES_DIR: resolvePath(EXPRESS_PATH, `upload`, `img`),
};

const OFFERS_PER_PAGE = 8;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};


const DATA_PATH = resolvePath(PROJECT_DIR, `data`);

const DataFilePath = {
  SENTENCES: resolvePath(DATA_PATH, `sentences.txt`),
  TITLES: resolvePath(DATA_PATH, `titles.txt`),
  CATEGORIES: resolvePath(DATA_PATH, `categories.txt`),
  COMMENTS: resolvePath(DATA_PATH, `comments.txt`),
  OFFER_TYPES: resolvePath(DATA_PATH, `offer-types.txt`),
  BIRTH_DATE: resolvePath(DATA_PATH, `birth-date.txt`)
};

const GenerateFileRequirements = {
  DEFAULT_OFFERS_COUNT: 1,
  MAX_OFFERS_COUNT: 1000,
  MAX_OFFERS_MESSAGE: `Не больше 1000 объявлений`,
  MONTH_INTERVAL: 3,
  MAX_COMMENTS: 4,
  MAX_USERS: 5,
  MIN_SUM: 1000,
  MAX_SUM: 100000,
  MAX_PICTURES: 16
};

const ServiceDir = {
  MODELS_PATH: resolvePath(PROJECT_DIR, `src/service`, `db/models`),
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  HttpStatusCode,
  MAX_ID_LENGTH,
  API_PREFIX,
  Env,
  DataFilePath,
  GenerateFileRequirements,
  OFFERS_PER_PAGE,
  ServiceDir,
  FrontDir
};
