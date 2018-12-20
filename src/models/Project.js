import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    original: {type: String, required: true},
    original_credit: {type: String, required: true},
    keyword: {type: String, required: true},
    summary: {type: String},
    last_nb_files: {type: Number, default: 0}
  })


module.exports = mongoose.model('Project', ProjectSchema);