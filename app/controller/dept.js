'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  constructor() {
    super();
    // const DepartmentService = require('../../service/dept');
    // this.service = new DepartmentService(this.ctx);
    this.service = this.ctx.service.dept;
  }

  // POST
  async create() {
    const { name, id, parentid, order } = this.ctx.request.body;
    const res = await this.service.create(id, name, parentid, order);
    this.ctx.ok('created', { id: res.partyid });
  }

  // POST
  async update() {
    const { name, id, parentid, order } = this.ctx.request.body;
    await this.service.update(id, { name, parentid, order });
    this.ctx.ok('updated');
  }

  // GET
  async delete() {
    const { id } = this.ctx.query;
    await this.service.delete(id);
    this.ctx.ok('deleted');
  }

  // GET
  async list() {
    const { id } = this.ctx.query;
    const list = await this.service.list(id);
    this.ctx.body = { errcode: 0, errmsg: 'ok', department: list };
  }
}

module.exports = DepartmentController;
