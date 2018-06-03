const mongoose = require('mongoose')

const livestockSchema = mongoose.Schema({
  name: {type: String, required: true},
  scientificName: {type: String, required: true},
  grouping: {type: String, required: true},
  quantity: {type: Number, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

livestockSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Database', livestockSchema)
