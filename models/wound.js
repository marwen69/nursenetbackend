const mongoose = require('mongoose');

const woundSchema = new mongoose.Schema({
  
  ficheSuivi: {
    plaiesPostOperation: Boolean, 
    plaies:Boolean, 
    plaiesPression:Boolean, 
    ulceresJambesPieds:  Boolean, 
  },
  evaluationInitiale: {
    date : Date,
    site: String,
    profondeur: String,
    grandeur: String,
    phaseNecrose:  Boolean, 
    inflammation: Boolean, 
    gangrene:  Boolean,
  },

  apparancePlaie: {
    seche:Boolean, 
    humide: Boolean, 
    necroseAvecFistule: Boolean, 
    oedeme:  Boolean, 
  },
  peauPourtour: {
    intacte:  Boolean, 
    maceration:Boolean,
    rose:  Boolean, 
    rougeur:  Boolean, 
    oedemePhlyctene: Boolean,
    induration:  Boolean, 
    allergies:  Boolean, 
  },
  ecoulement: {
    quantite: String,
    serux:  Boolean, 
    sanguinolent:  Boolean, 
    seroSanguinolent: Boolean, 
    purulent:  Boolean, 
  },
  materielEnPlace: {
    drain:  Boolean, 
    meche:  Boolean,
    longueurCm: Number,
    pointsAgrafes: Boolean, 
  },
  nettoyage: {
    serumPhysiologique:Boolean, 
  },
  pansement: {
    sparadrap: Boolean, 
    tulleGras: Boolean, 
    protecteurCutane: Boolean,
    compresse:Boolean,
    bandage:Boolean,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
});

const Wound = mongoose.model('Wound', woundSchema);

module.exports = Wound;
