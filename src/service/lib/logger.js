'use strict';

const fs = require(`fs`);
const pinoms = require(`pino-multi-stream`);

const {Env} = require(`../../constants`);
const LOG_FILE_ALL = `./logs/all.log`;
const LOG_FILE_ERRORS = `./logs/errors.log`;

const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    colorize: true,
    translateTime: `dd-mm-yyyy HH:MM:ss`,
    ignore: `hostname, pid`,
    levelFirst: true,
  },
  prettifier: require(`pino-pretty`)
});

const level = process.env.LOG_LEVEL || defaultLogLevel;

const streams = [
  {level, stream: prettyStream},
  {level, stream: fs.createWriteStream(LOG_FILE_ALL)},
  {level: `error`, stream: fs.createWriteStream(LOG_FILE_ERRORS)}
];

const logger = pinoms({
  name: `pino-in-express`,
  level,
}, pinoms.multistream(streams));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
