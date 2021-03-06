'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const NafService = require('./base');

class UserinfoService extends NafService {
  constructor(ctx) {
    super(ctx, 'naf_user_info');
    this.model = ctx.model.User;
    this.dept = this.ctx.service.dept;
  }

  async create(data) {
    const { userid, name, mobile, department = [ 0 ], order = [ 0 ], position, gender, email, isleader = 0, enable = 1, telephone, attrs } = data;
    // TODO:参数检查和默认参数处理
    assert(userid);
    assert(name);
    assert(mobile);
    const status = 1;

    // TODO:检查useridh和mobile
    let count = await this._count({ userid });
    if (count > 0) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '用户ID已存在');
    }
    count = await this._count({ mobile });
    if (count > 0) {
      throw new BusinessError(ErrorCode.DATA_EXISTED, '手机号已存在');
    }

    // TODO:保存数据
    const res = await this._create({ userid, name, mobile, department, order, position, gender, email, isleader, enable, telephone, attrs, status });
    return res;
  }

  async fetch(userid) {
    const res = await this._findOne({ userid, tenant: this.tenant });
    return res;
  }

  async update(userid, update) {
    // TODO:参数检查和默认参数处理
    assert(userid);
    assert(update);

    // TODO:提取可修改的字段
    const { name, department, order, position, gender, email, isleader, enable, telephone, attrs } = update;

    // TODO:保存数据
    const entity = await this._findOneAndUpdate({ userid, tenant: this.tenant },
      { name, department, order, position, gender, email, isleader, enable, telephone, attrs },
      { new: true });
    return entity;
  }

  async batchdelete(useridlist) {
    await this._remove({ userid: { $in: useridlist } });
  }

  async delete(userid) {
    await this._remove({ userid });
  }

  async list(department_id = 0, fetch_child = 0, simple = 1) {
    let depts = [ department_id ];
    if (fetch_child) {
      let rs = this.dept.findChildren(department_id);
      rs = rs.map(p => p.id);
      depts = depts.concat(...rs);
    }
    let query = this.model.where({ tenant: this.tenant, department: { $elemMatch: { $in: depts } } });
    if (simple) query = query.select({ userid: 1, name: 1, department: 1 });
    const res = await query.exec();
    return res;
  }

}

module.exports = UserinfoService;
