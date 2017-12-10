'use strict';
const { RequiredString } = require('../util/schema');

const SchemaDefine = {
  id: { type: Number, required: true },
  parentid: Number,
  name: RequiredString(64),
  order: Number,
  tenant: RequiredString(64),
};

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Department', new mongoose.Schema(SchemaDefine), 'naf_user_dept');
};
