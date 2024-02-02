const Shift = require("../models/shiftModel");
const Employee = require("../models/employeeModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//get all shifts
const getAllShifts = (filters) => {
  return Shift.find(filters);
};

//get shift by ID
const getShiftById = (id) => {
  return Shift.findById({ _id: id });
};

//update shift by ID
const updateShift = async (id, obj) => {
  await Shift.findByIdAndUpdate(id, obj);
  return "Shift Updated!!;";
};

//add shift
const addShift = async (obj) => {
  const sh = new Shift(obj);
  await sh.save();
  return "Shift created!!";
};

//delete shift by ID
const deleteShift = async (id) => {
  await Shift.findByIdAndDelete(id);
  return "Shift deleted!!!";
};

//returns employees that DONT work on a specific shift
const empNotInShift = async (id) => {
  //gets sll employees
  const employees = await Employee.find({});
  const notInShift = [];
  //creates ID by mongoose format
  const mongooseId = new ObjectId(id);
  //for each emplotee if they dont have a shifts id that is equal to a given id push it into the array
  employees.forEach((employee) => {
    const index = employee.shiftsId.findIndex((i) => i.equals(mongooseId));
    if (index === -1) {
      notInShift.push(employee);
    }
  });

  //return all employees that are not in the shift
  return notInShift;
};

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
  empNotInShift,
};
