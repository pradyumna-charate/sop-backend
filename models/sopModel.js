
const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  stepId: String,
  name: String,
  subSteps: [{
    id: Number,
    name: String,
    details: String,
    video: String,
    image: String,                   //...................................image added in sop
    timeRequired: Number,
  }],
});

const sopSchema = new mongoose.Schema({
  id: Number,
  name: String,
  details: String,
  description: String,
  image: String,
  step:[String],
  steps:[{type:mongoose.Schema.ObjectId,ref:"Steps"}]
});

const SopModel = mongoose.model('SopModel', sopSchema);
const Steps = mongoose.model('Steps', stepSchema);


module.exports = {
  SopModel: SopModel,
  Steps: Steps
};

