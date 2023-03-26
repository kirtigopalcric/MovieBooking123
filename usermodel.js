const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isLoggedIn: { type: Boolean, required: true },
  uuid: { type: String },
  accesstoken: { type: String },
  coupens: [{
    id: { type: Number },
    discountValue: { type: Number }
  }],
  bookingRequests: [{
    reference_number: { type: Number },
    coupon_code: { type: Number },
    show_id: { type: Number },
    tickets: [{ type: Number }]
  }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    next();
  });
  
  userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;
