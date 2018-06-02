const mongoose = require('mongoose');

const tankSchema = mongoose.Schema({
  length: {type: Number, required: true},
  width: {type: Number, required: true},
  height: {type: Number, required: true},
  volume: {type: Number, required: true},
  livestock: [{type: mongoose.Schema.Types.ObjectId, ref: 'Database'}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

tankSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Tank', tankSchema);