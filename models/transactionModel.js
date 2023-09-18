const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userid: String,
  organizationid: String,
  sopid: String,
  sopname: String,
  sopdata: Date,
  starttime: String,
  endtime: String,
  totaltime: Number,
  stepid: [{
    stepid: String,
    stepname: String,
    substepdetails: [
      {
        substepid: String,
        // starttime: Number,
        // endtime: Date
        substepname: String,
        substeptime: String,

        
      }
    ],
    stopdetails: [
      {
        substepid: String,
        starttime: Number,
        endtime: Date,
        reason: String
      }
    ],
  }],
  Progressbar: String,
  statuscode: String,
  statusmessage: String,
  transactionid: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
