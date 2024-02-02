const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    date: Date, //date of shift
    startHour: Number, //hour to start shift
    endHour: Number, //hour to end shift
    employeesId: [
      //ids of all employees on current shift
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
      },
    ],
  },
  { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;
