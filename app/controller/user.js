'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    // const UserService = require('../../service/user');
    // this.service = new UserService(ctx);
    this.service = this.ctx.service.user;
  }

  async create() {
    const { ctx } = this;
    const { userid, name } = ctx.request.body;
    const res = await ctx.model.User.create({ userid, name });
    console.log(res);
    this.ctx.body = { errcode: 0, errmsg: 'created' };
  }

  async fetch() {
    const { ctx } = this;
    const { userid } = ctx.query;
    const res = await ctx.model.User.findOne({ userid }).exec();
    ctx.body = res || 'none';
  }

  async update() {
    this.ctx.body = 'hi, user!';
  }

  async delete() {
    this.ctx.body = 'hi, user!';
  }

  async batchdelete() {
    this.ctx.body = 'hi, user!';
  }

  async simplelist() {
    this.ctx.body = 'hi, user!';
  }

  async list() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.find({}).exec();
  }
}

module.exports = UserController;
