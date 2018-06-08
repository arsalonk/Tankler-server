const mongoose = require('mongoose')

const databaseSchema = mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  order: { type: String },
  family: { type: String },
  grouping: { type: String, required: true },
  img: { type: String },
  expanded: { type: Boolean }
});

databaseSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Database', databaseSchema)
