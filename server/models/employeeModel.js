const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentId: {
      //id of department the employee is working in
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    shiftsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shift",
      },
    ],
  },
  { versionKey: false }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
