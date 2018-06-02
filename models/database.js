const mongoose = require('mongoose')

const databaseSchema = mongoose.Schema({
  name: {type: String, required: true},
  scientificName: {type: String, required: true},
  grouping: {type: String, required: true}
})

databaseSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Database', databaseSchema)
