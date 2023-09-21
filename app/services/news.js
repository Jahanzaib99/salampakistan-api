'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');

module.exports = {
  create,
  update,
  get,
  remove,
  getDetails
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      title: validations.rules.textRequired('Title'),
      description: validations.rules.textRequired('Description'),
      isFeatured: validations.rules.booleanRequired('isFeatured')
    }
  })
    .then(repos.news.create)
    .then((news) => {
      return Promise.resolve({
        id: news._id,
        message: messages.news.createSuccess
      });
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      newsId: validations.rules.ObjectId('newsId'),
      title: validations.rules.textRequired('Title'),
      description: validations.rules.textRequired('Description'),
      isFeatured: validations.rules.booleanRequired('isFeatured')
    }
  })
    .then(repos.news.findById.bind(this, payload.newsId))
    .then((news) => {
      if (!news) {
        throw new restify.errors.NotFoundError(messages.news.notExists);
      }
      return repos.news.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.news.saveSuccess
      });
    });
}

function get(payload) {
  return repos.news.get(payload)
    .then((news) => {
      return {
        data: news.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: news.total
        }
      };
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      newsId: validations.rules.ObjectId('newsId')
    }
  })
    .then(repos.news.findById.bind(this, payload.newsId))
    .then((news) => {
      if (!news) {
        throw new restify.errors.NotFoundError(messages.news.notExists);
      }
      return repos.news.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.news.removeSuccess
      });
    });
}

function getDetails(payload) {
  return validations.validatePayload(payload, {
    properties: {
      newsId: validations.rules.ObjectId('newsId')
    }
  })
    .then(repos.news.findById.bind(this, payload.newsId))
    .then((news) => {
      if (!news) {
        throw new restify.errors.NotFoundError(messages.news.notExists);
      }
      return Promise.resolve(news);
    })
    .then((news) => {
      return Promise.resolve({
        data: news
      });
    });
}
