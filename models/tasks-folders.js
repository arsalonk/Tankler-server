const mongoose = require('mongoose');

const tasksFoldersSchema = mongoose.Schema({
  name: { type: String, required: true}
});

tasksFoldersSchema.set('toObject', {
  transform: function ( doc, ret ) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('TasksFolder', tasksFoldersSchema);