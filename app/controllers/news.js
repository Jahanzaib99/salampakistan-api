'use strict';

const services = require('../services');
module.exports = {
  create,
  update,
  get,
  getDetails,
  remove
};

/**
 * @api {post} /api/news Create
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup news
 * @apiPermission Admin
 *
 * @apiParam {String} name Name
 * @apiParam {String} description Description
 * @apiParam {Boolean} isFeatured isFeatured
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "_id": "5e371d5546158c3af449bf96",
        "message": "News has been created."
        }
    }
}
 */
function create(req, res, next) {
  let payload = {
    title: req.body.title,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.news.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {put} /api/news/:newsId update
 * @apiVersion 1.0.0
 * @apiName update
 * @apiGroup news
 * @apiPermission Admin
 *
 * @apiParam {String} name Name
 * @apiParam {String} description Description
 * @apiParam {Boolean} isFeatured isFeatured
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "News has been updated."
        }
    }
}
 */
function update(req, res, next) {
  let payload = {
    newsId: req.params.newsId,
    title: req.body.title,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.news.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/news get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup news
 * @apiPermission Admin
 *
 * @apiParam {String} search search
 * @apiParam {Number} pageSize pageSize
 * @apiParam {Number} skip Skip
 * @apiParam {Boolean} isFeatured isFeatured
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "_id": "605c50e483715e43506d5ff1",
            "isFeatured": true,
            "title": "req.body.title",
            "description": "req.body.description"
        }
    ],
    "meta": {
        "pageSize": 5,
        "skip": 0,
        "total": 3
        }
    }
}
 */
function get(req, res, next) {
  let payload = {
    search: req.query.search,
    isFeatured: req.query.isFeatured,
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    auth: req.auth
  };
  return services.news.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {get} /api/news/:newsId getDetails
 * @apiVersion 1.0.0
 * @apiName getDetails
 * @apiGroup news
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
            "_id": "605c528e525fe64948c2481a",
            "isActive": true,
            "isFeatured": false,
            "title": "req.body.title1",
            "description": "req.body.description1",
            "updatedAt": "2021-03-25T09:15:59.374Z",
            "createdAt": "2021-03-25T09:06:22.789Z",
            "__v": 0,
            "updatedBy": "5f662fdf49e4e06fa4a07607"
        }
    }
}
 */
function getDetails(req, res, next) {
  let payload = {
    newsId: req.params.newsId || req.query.newsId,
    auth: req.auth
  };
  return services.news.getDetails(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {delete} /api/news/:newsId remove
 * @apiVersion 1.0.0
 * @apiName remove
 * @apiGroup news
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "News has been Deleted."
        }
    }
}
 */
function remove(req, res, next) {
  let payload = {
    newsId: req.params.newsId,
    auth: req.auth
  };
  return services.news.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
