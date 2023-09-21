'use strict';

const services = require('../services');
module.exports = {
  create,
  get
};

/**
 * @api {post} /api/placeOrder Create
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup payment
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
        "message": "Payment has been created."
        }
    }
}
 */
function create(req, res, next) {
  let payload = {
    body: req.body
  };
  return services.payment.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/payment get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup payment
 * @apiPermission Admin
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
          {
        "id": 11,
        "parent_id": 0,
        "payment_type": "HBLCard",
        "payment_method": "HBLCard",
        "method_type": null,
        "air_comm": 0,
        "gateway": "HBL",
        "title": "HBL",
        "status": 1,
        "sort_order": 1,
        "active": "",
        "disable_bus": null,
        "disable_cinema": null,
        "gateway_img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/hbl.png",
        "img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/cc-icon.png",
        "img_selected": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/cchbl-icon.png",
        "code": "hbl",
        "offer_id": 0,
        "offer_services": "",
        "offer_cinemas": "",
        "offer_events": "",
        "identifier": "hbl",
        "class_namespace": "",
        "class_method": "",
        "allowed_verticals_bits": 1918,
        "disallowed_verticals_bits": 0,
        "allowed_buses_bits": 0,
        "disallowed_buses_bits": 0,
        "payment_methods": [
            {
                "id": 12,
                "parent_id": 11,
                "payment_type": "HBLCard",
                "payment_method": "HBLCard",
                "method_type": "card",
                "air_comm": 0,
                "gateway": "HBL",
                "title": "Debit/Credit Card",
                "status": 1,
                "sort_order": 1,
                "active": "",
                "disable_bus": null,
                "disable_cinema": null,
                "gateway_img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/creditcard.png",
                "img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/cc-icon.png",
                "img_selected": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/images/pay/app/cc-icon-active.png",
                "code": "IBFT",
                "offer_id": 0,
                "offer_services": "",
                "offer_cinemas": "",
                "offer_events": "",
                "identifier": "hbl-cc",
                "class_namespace": "",
                "class_method": "",
                "allowed_verticals_bits": 1918,
                "disallowed_verticals_bits": 0,
                "allowed_buses_bits": 0,
                "disallowed_buses_bits": 0
            }
        ]
    }
    ]
}
 */
function get(req, res, next) {
  let payload = {
  };
  return services.payment.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}
