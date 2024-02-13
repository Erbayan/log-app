const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    },
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});
userSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("User", userSchema);

module.exports = User;
