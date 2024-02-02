const Department = require("../models/departmentModel");
const Employee = require("../models/employeeModel");
const Shift = require("../models/shiftModel");

//get all Departments with filter
const getAllDepartments = (filter) => {
  return Department.find(filter);
};

//get department by ID
const getDepartmentById = (id) => {
  return Department.findById({ _id: id });
};

//update department by ID
const updateDepartment = async (id, obj) => {
  await Department.findByIdAndUpdate(id, obj);
  return "Department Updated!!;";
};

//add department
const addDepartment = async (obj) => {
  const dep = new Department(obj);
  await dep.save();
  return "Department created!!";
};

//delete department by ID , all departments employees and update shifts of those employees(remove them from shifts)
const deleteDepartment = async (id) => {
  // Find and delete the department by ID
  await Department.findByIdAndDelete(id);

  // Find all employees in the department
  const employeesToDelete = await Employee.find({ departmentId: id });

  // Get the IDs of employees to delete
  const employeeIdsToDelete = employeesToDelete.map((employee) => employee._id);
  //Get all shifts
  const shifts = await Shift.find({});

  const deleteEmpArr = [];
  const updateShifts = [];

  //delete all the Employees in the department
  employeeIdsToDelete.forEach((emp) => {
    deleteEmpArr.push(Employee.findByIdAndDelete(emp));
  });
  await Promise.all(deleteEmpArr);

  //for each employee need to update shifts
  employeeIdsToDelete.forEach((eid) => {
    shifts.forEach((shift) => {
      //for each shift remove the id of the deleted mployee from employeesID array
      shift.employeesId = shift.employeesId.filter((employeeId) => {
        return !employeeId.equals(eid);
      });
      //update shifts with new array (withought the deleted employee ID)
      updateShifts.push(Shift.findByIdAndUpdate(shift._id, shift));
    });
  });

  await Promise.all(updateShifts);

  return "Department and its employees deleted!!!";
};

//get specific data od a department with employee(manager) name
const getDepWithEmp = async () => {
  const departments = await Department.aggregate([
    {
      $lookup: {
        from: Employee.collection.name,
        localField: "manager",
        foreignField: "_id",
        as: "emp",
      },
    },
    {
      $unwind: "$emp",
    },

    {
      $project: {
        _id: 1,
        name: 1,
        manager: 1,
        managerName: { $concat: ["$emp.firstName", " ", "$emp.lastName"] },
      },
    },
  ]);

  return departments;
};

//get all departments that have no manager
const getDepWithNoEmp = async () => {
  const departments = await Department.find({});
  const depArr = departments.filter((dep) => !dep.manager);
  return depArr;
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepWithEmp,
  getDepWithNoEmp,
};
