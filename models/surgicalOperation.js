const mongoose = require('mongoose');

const surgicalOperationSchema = new mongoose.Schema({
  preOperative: {
    datepreOperative: Date,
    lieupreOperative:   String,
    initialspreOperative: String,
  },
  drains: {
    typedrains: String,
    aspirationdrains: String ,
    enleveenPlacedrains: String,
    enPlacedrains: {
      initenPlacedrains: Date, 
      installeenPlacedrains: Date,
      enleveenPlacedrains: Date
    }
  },
  postOperative: {
    soinpostOperative: String,
    datepostOperative: Date,
    lieupostOperative: String,
    initialspostOperative: String,
  },
  observations: String,

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
});

const SurgicalOperation = mongoose.model('SurgicalOperation', surgicalOperationSchema);

module.exports = SurgicalOperation;
