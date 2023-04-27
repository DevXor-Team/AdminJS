import mongoose from "mongoose";
const { Schema } = mongoose;

const GuildSchema = new Schema({
  guildId: {
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

const Guild = mongoose.model("guilds", GuildSchema);
module.exports = Guild;
