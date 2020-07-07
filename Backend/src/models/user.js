import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   { type: String, required: [true, 'El nombre es necesario'] },
  email: { type: String, unique: true, required: [true, 'Email es necesario'] },
  avatar: String,
  password: { type: String, required: [true, 'Pass es necesario'] },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

// Validator
userSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });

//Delete password from res json
userSchema.methods.toJSON = function(){
  var obj = this.toObject();
  delete obj.password;
  return obj
}

module.exports = mongoose.model('User', userSchema)