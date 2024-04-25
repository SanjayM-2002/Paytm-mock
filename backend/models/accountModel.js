const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 1000,
  },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = { Account };
