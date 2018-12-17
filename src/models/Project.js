import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    original: {type: String, required: true},
    keyword: {type: String, required: true},
    summary: {type: String, required: true}
  })


module.exports = mongoose.model('Project', ProjectSchema);