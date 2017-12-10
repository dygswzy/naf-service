'use strict';

const assert = require('assert');
const Service = require('egg').Service;

class NafService extends Service {
  constructor(ctx, name) {
    assert(name);
    super(ctx);
    this.seqName = name;
  }
  get tenant() {
    return this.ctx.tenant;
  }
  async nextId() {
    const { seq } = this.ctx.service;
    const value = await seq.nextVal(this.seqName);
    return value;
  }
  async _create(data, model) {
    assert(data);
    model = model || this.model;
    return await model.create({ ...data, tenant: this.tenant }).exec();
  }
  async _findById(_id, model) {
    model = model || this.model;
    return await model.findById(_id).exec();
  }
  async _find(conditions = {}, projection, options, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.find(conditions, projection, options).exec();
  }
  async _findOne(conditions = {}, projection, options, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.findOne(conditions, projection, options).exec();
  }
  async _remove(conditions = {}, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.remove(conditions).exec();
  }
  async _findOneAndUpdate(conditions, update, options = { new: true }, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.findOneAndUpdate(conditions, update, options).exec();
  }
  async _update(conditions, update, options, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.update(conditions, update, options).exec();
  }
  async _count(conditions, model) {
    conditions.tenant = this.tenant;
    model = model || this.model;
    return await model.count(conditions).exec();
  }
}

module.exports = NafService;
