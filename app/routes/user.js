'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = (server) => {
  // Create
  // server.post(/\/api\/users\/(admin|vendor|employee|customer|superAdmin)/, auth.required(enums.user.type.admin), controllers.user.create);
  server.post(`${enums.url.baseUrl}/users`, auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.employee]), controllers.user.create);

  // List
  // server.get(/\/api\/users\/(admin|vendor|customer)/, auth.required(enums.user.type.admin), controllers.user.getAll);
  server.get(`${enums.url.baseUrl}/users`, auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.employee]), controllers.user.getAll);

  // Individual
  server.get(`${enums.url.baseUrl}/users/:userId`, auth.required(null, ['userId']), controllers.user.getById);

  // update status
  server.put(`${enums.url.baseUrl}/users/:userId/updateStatus`, auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.employee]), controllers.user.updateStatus);

  // profile Update
  server.put(`${enums.url.baseUrl}/users/:userId/update`, auth.required(null, ['userId']), controllers.user.update);

  // delete
  server.del(`${enums.url.baseUrl}/users/:userId/remove`, auth.required(null, ['userId']), controllers.user.remove);

  // Save Profile
  server.put(`${enums.url.baseUrl}/users/:userId`, auth.required(null, ['userId']), controllers.user.saveProfile);
  server.put(`${enums.url.baseUrl}/users/:userId/password`, auth.required(null, ['userId']), controllers.user.changePassword);

  // Photos
  server.post(`${enums.url.baseUrl}/users/:userId/photos`, auth.required([enums.user.type.admin, enums.user.type.customer, enums.user.type.employee]), imageUpload, imageValidation, controllers.user.uploadPhoto);
  server.del(`${enums.url.baseUrl}/users/:userId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.customer, enums.user.type.employee]), imageRemove, controllers.user.removePhoto);

  // Add a single even in the WishList (user-> Customer -> {})
  server.post(`${enums.url.baseUrl}/user/wishlist`, auth.required(), controllers.user.addToWish);
  // Remove All Wish List
  server.put(`${enums.url.baseUrl}/user/wishlist/removeAll`, auth.required(), controllers.user.deleteAll);
  // Remove A Single Event from Wish List
  server.put(`${enums.url.baseUrl}/user/wishlist/remove`, auth.required(), controllers.user.removeWishList);
  // to get wishlist of user with event detail
  server.get(`${enums.url.baseUrl}/user/wishlist/:userId`, auth.required(), controllers.user.getUserWishlist);
  // Planning apis
  server.post(`${enums.url.baseUrl}/user/plan`, auth.required(), controllers.user.addToPlan);
  server.get(`${enums.url.baseUrl}/user/plan/:userId`, auth.required(), controllers.user.getUserPlan);
  server.put(`${enums.url.baseUrl}/user/plan/remove`, auth.required(), controllers.user.removePlan);

};
