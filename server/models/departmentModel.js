const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    manager: {
      //id of meployee who is manager of current department
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
  },
  { versionKey: false }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
