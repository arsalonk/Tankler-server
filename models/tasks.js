const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true}
});

taskSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);