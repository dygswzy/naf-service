'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/info', controller.home.info);

  // TODO: 序列管理接口
  router.post('/seq/nextval', controller.seq.nextval);

  // TODO: 成员管理接口
  router.post('/user/create', controller.user.info.create);
  router.get('/user/get', controller.user.info.fetch);
  router.post('/user/update', controller.user.info.update);
  router.get('/user/delete', controller.user.info.delete);
  router.post('/user/batchdelete', controller.user.info.batchdelete);
  router.get('/user/simplelist', controller.user.info.simplelist);
  router.get('/user/list', controller.user.info.list);

  // TODO: 部门管理接口
  router.post('/dept/create', controller.user.dept.create);
  router.post('/dept/update', controller.user.dept.update);
  router.get('/dept/delete', controller.user.dept.delete);
  router.get('/dept/list', controller.user.dept.list);

  // TODO: 标签管理接口
  router.post('/tag/create', controller.user.tag.create);
  router.get('/tag/get', controller.user.tag.fetch);
  router.post('/tag/update', controller.user.tag.update);
  router.get('/tag/delete', controller.user.tag.delete);
  router.post('/tag/addtagusers', controller.user.tag.addtagusers);
  router.get('/tag/deltagusers', controller.user.tag.deltagusers);
  router.get('/tag/list', controller.user.tag.list);

  // TODO: 自动配置路由,将所有以‘Action’结尾的方法自动进行路由注册
  Object.keys(app.controller).forEach(key => {
    const c = app.controller[key];
    Object.keys(c).forEach(a => {
      if (a.endsWith('Action')) {
        const p = a.substr(0, a.length - 6);
        app.all(`/${key}${p === 'index' ? '' : ('/' + p)}`, `${key}.${a}`);
      }
    });
  });
};
