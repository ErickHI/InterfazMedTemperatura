/*
 Tecnológico Nacional de México
 Instituto Tecnológico de Pachuca
 Sistemas Programables
 Equipo 4:
  Hernández Islas Erick
  Herrera Pérez Roberto
  Salazar Reyes Ricardo Axel
 Docente: Ing. Miguel Ángel Acosta Jiménez
*/

const {Schema, model} = require('mongoose');

const MotorSchema = new Schema({
    temperatura:{type: String, required: true},
    modo: {type: String},
    accion:{type: String},
    fecha:{type: Date, default: Date.now}
});

module.exports = model('Motor', MotorSchema);