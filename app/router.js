'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/destory', controller.user.destory);
  router.post('/api/user/all', app.jwt, controller.user.all);
};
