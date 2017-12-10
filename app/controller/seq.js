'use strict';

const Controller = require('egg').Controller;

class SequenceController extends Controller {
  async nextval() {
    const { seq } = this.ctx.service;
    const { name } = this.ctx.request.body;

    const value = await seq.nextval(name);
    this.ctx.body = { errcode: 0, errmsg: 'ok', value };
  }

  async infoAction() {
    const { seq } = this.ctx.service;

    this.ctx.body = seq;
  }

}


module.exports = SequenceController;
