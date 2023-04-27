import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },

  blacklist: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },

  language: {
    type: mongoose.SchemaTypes.String,
    default: "en",
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
