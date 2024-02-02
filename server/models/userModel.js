const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String, //first name and second name
    maxNumOfActions: Number, //max amount of actions allowed
    numOfActions: Number, //currendt amount of actions left
    date: String, //last date loged in
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
