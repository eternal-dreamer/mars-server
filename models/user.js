import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, default: new Date() },
  gender: String,
  maritialStatus: String,
  imageUrl: String,

  id: { type: String },

});

const User = mongoose.model('User', userSchema);

export default User;