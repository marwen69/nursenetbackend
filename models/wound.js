const mongoose = require('mongoose');

const woundSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
  ficheSuivi: {
    plaiesPostOperation: { type: Boolean, default: false },
    plaies: { type: Boolean, default: false },
    plaiesPression: { type: Boolean, default: false },
    ulceresJambesPieds: { type: Boolean, default: false },
  },
  evaluationInitiale: {
    date: { type: Date, default: Date.now },
    site: String,
    profondeur: String,
    grandeur: String,
    phaseNecrose: { type: Boolean, default: false },
    inflammation: { type: Boolean, default: false },
    gangrene: { type: Boolean, default: false },
  },
  apparancePlaie: {
    seche: { type: Boolean, default: false },
    humide: { type: Boolean, default: false },
    necroseAvecFistule: { type: Boolean, default: false },
    oedeme: { type: Boolean, default: false },
  },
  peauPourtour: {
    intacte: { type: Boolean, default: false },
    maceration: { type: Boolean, default: false },
    rose: { type: Boolean, default: false },
    rougeur: { type: Boolean, default: false },
    oedemePhlyctene: { type: Boolean, default: false },
    induration: { type: Boolean, default: false },
    allergies: { type: Boolean, default: false },
  },
  ecoulement: {
    quantite: String,
    serux: { type: Boolean, default: false },
    sanguinolent: { type: Boolean, default: false },
    seroSanguinolent: { type: Boolean, default: false },
    purulent: { type: Boolean, default: false },
  },
  materielEnPlace: {
    drain: { type: Boolean, default: false },
    meche: { type: Boolean, default: false },
    longueurCm: Number,
    pointsAgrafes: { type: Boolean, default: false },
  },
  nettoyage: {
    serumPhysiologique: { type: Boolean, default: false },
  },
  pansement: {
    sparadrap: { type: Boolean, default: false },
    tulleGras: { type: Boolean, default: false },
    protecteurCutane: { type: Boolean, default: false },
    compresse: { type: Boolean, default: false },
    bandage: { type: Boolean, default: false },
  },
});

const Wound = mongoose.model('Wound', woundSchema);

module.exports = Wound;
