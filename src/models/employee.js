// const mongoose = require('mongoose');
// const { Schema } = mongoose;
const { Schema, model } = require('mongoose')


const EmployeeSchema = new Schema({
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: { type: Number, default: 0 },
});

module.exports = model('Employee', EmployeeSchema);
