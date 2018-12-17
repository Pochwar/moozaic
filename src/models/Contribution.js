import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ContributionSchema = new Schema(
  {
    tweet: {type: Object, required: true},
    project_id: {type: Number, required: true},
  })


module.exports = mongoose.model('Contribution', ContributionSchema);