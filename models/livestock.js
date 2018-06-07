const mongoose = require('mongoose')

const livestockSchema = mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  nickname: { type: String },
  grouping: { type: String, required: true },
  createdAt: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

livestockSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Livestock', livestockSchema)
