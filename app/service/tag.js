'use strict';

const assert = require('assert');
const is = require('is-type-of');
const NafService = require('./base');

class TagService extends NafService {
  constructor(ctx) {
    super(ctx, 'naf_user_tag');
    this.model = ctx.model.Tag;
    this.user = ctx.service.user;
    this.dept = ctx.service.dept;
  }

  async create(tagid, tagname) {
    assert(tagname);
    tagid = tagid || await this.nextId();
    const res = await this._create({ tagid, tagname });
    return res;
  }

  async update(tagid, tagname) {
    assert(tagid);
    const res = await this._findOneAndUpdate({ tagid }, { tagname });
    return res;
  }

  async delete(tagid) {
    assert(tagid);
    await this._remove({ tagid });
  }

  // 获取标签成员
  async fetchUsers(tagid) {
    assert(tagid);
    const ret = await this._findOne({ tagid });
    ret.userlist = await this.user._find({ userid: { $in: ret.userlist } }, 'userid name');
    return ret;
  }

  async addtagusers(tagid, userlist = [], partylist = []) {
    assert(tagid);
    assert(is.array(userlist));
    assert(is.array(partylist));
    return await this._findOneAndUpdate({ tagid }, { $push: {
      userlist: { $each: userlist },
      partylist: { $each: partylist },
    } });
  }

  async deltagusers(tagid, userlist = [], partylist = []) {
    assert(tagid);
    assert(is.array(userlist));
    assert(is.array(partylist));
    return await this._findOneAndUpdate({ tagid }, { $pull: {
      userlist: { $in: userlist },
      partylist: { $in: partylist },
    } });
  }

  async list() {
    return await this._find({}, 'tagid tagname');
  }
}

module.exports = TagService;
