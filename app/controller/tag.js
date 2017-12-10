'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async index() {
    this.ctx.body = 'hi, user!';
  }

  async create() {
    const { ctx } = this;
    const { tag: service } = ctx.service;
    const { tagid, tagname } = ctx.request.body;
    const res = await service.create(tagid, tagname);
    this.ctx.body = { errcode: 0, errmsg: 'created', tagid: res.tagid };
  }

  async fetch() {
    const { ctx } = this;
    const { userid } = ctx.query;
    const res = await ctx.model.Tag.findOne({ userid }).exec();
    ctx.body = res || 'none';
  }

  async update() {
    this.ctx.body = 'hi, user!';
  }

  async delete() {
    this.ctx.body = 'hi, user!';
  }

  async addtagusers() {
    this.ctx.body = 'hi, user!';
  }

  async deltagusers() {
    this.ctx.body = 'hi, user!';
  }

  async list() {
    const { ctx } = this;
    ctx.body = await ctx.model.Tag.find({}).exec();
  }
}

module.exports = TagController;
