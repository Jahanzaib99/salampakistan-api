'use strict';

let services = require('../services');

module.exports = {
  get
};

/**
 * @api {get} /api/poi Get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup Poi
 *
 * @apiSuccess {String} response POIs Array
 * @apiSuccessExample {JSON} Success-Response:
 *{
    "data": [
               {
            "_id": "5f96031dc2280d50da55b7b3",
            "business_status": "OPERATIONAL",
            "formatted_address": "South Waziristan Agency, Federally Administered Tribal Area, Pakistan",
            "location": {
                "coordinates": [
                    69.8165441,
                    32.5465625
                ],
                "_id": "5f96031dc2280d50da55b7b4",
                "type": "Point"
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_recreational-71.png",
            "name": "Yousuf Shamiraie Garden",
            "photos": [
                {
                    "height": 2322,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104761039762404815013\">Drhabib Khan</a>"
                    ],
                    "photo_reference": "CmRaAAAANIhjYt169V5vBf_cKmOJHvJ7pfe1Y7bfmKtCkFEGvRFd3FluI5L7c2dLOlXJATjryXgs9h-eR0Q9zFqt2CkcXys7i1Ry_Pf9pkj5lF8FRT6KbkPus1TrH1uwM3MCrhXuEhDqZ0IZ8-bsQGVxl01R-TGqGhTy_L0xxLq_iQmAJ8ie3sWpGFQQPA",
                    "width": 4128
                }
            ],
            "place_id": "ChIJfQC9fUk3KDkRzD8Nrl-P4kw",
            "plus_code": {
                "compound_code": "GRW8+JJ Kaniguram",
                "global_code": "8J4FGRW8+JJ"
            },
            "rating": 5,
            "reference": "ChIJfQC9fUk3KDkRzD8Nrl-P4kw",
            "types": [
                "park",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 2,
            "__v": 0
        }
    ]
}
 */

function get(req, res, next) {
  let payload = {
    coordinates: req.query.coordinates,
    minDistance: req.query.minDistance,
    maxDistance: req.query.maxDistance,
    typeKey: req.query.typeKey
  };
  return services.poi.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}
