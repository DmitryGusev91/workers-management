const Employee = require("../models/employeeModel");
const Department = require("../models/departmentModel");
const Shift = require("../models/shiftModel");

//get all employees
const getAllEmployees = async (filters) => {
  return Employee.find(filters);
};

//sends info with employee , department and shift and filters if needed
const getEmployeesWithDep = async (filters) => {
  //makes tha pipeline itself
  const aggregationPipeline = [
    {
      //takes the department and its info
      $lookup: {
        from: Department.collection.name,
        localField: "departmentId",
        foreignField: "_id",
        as: "dep",
      },
    },
    {
      $unwind: "$dep",
    },
    {
      //takes the shift and its info
      $lookup: {
        from: Shift.collection.name, // Replace 'Shift' with your actual Shift model name
        localField: "shiftsId",
        foreignField: "_id",
        as: "shifts",
      },
    },
    {
      //in the output if connect the first name and second name to fullName , gives startWorkYear , department name and shifts
      $project: {
        _id: 1,
        fullName: { $concat: ["$firstName", " ", "$lastName"] },
        startWorkYear: 1,
        departmentId: "$dep._id",
        department: "$dep.name",
        shifts: {
          $map: {
            input: "$shifts",
            as: "shift",
            in: {
              date: "$$shift.date",
              startHour: "$$shift.startHour",
              endHour: "$$shift.endHour",
            },
          },
        },
      },
    },
  ];
  //if the filters length is not 0 (not empty) then filter by department
  let key = Object.keys(filters);
  if (key.length !== 0) {
    aggregationPipeline.push({
      $match: { department: filters.department },
    });
  }

  const employees = await Employee.aggregate(aggregationPipeline);
  return employees;
};

//get employee by ID
const getEmployeeById = (id) => {
  return Employee.findById({ _id: id });
};

//update employee by ID
const updateEmployee = async (id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return "Employee Updated!!;";
};

//add new employee
const addEmployee = async (obj) => {
  const emp = new Employee(obj);
  await emp.save();
  return "Employee created!!";
};

//delete employee and remove its id from all the shifts
const deleteEmployee = async (id) => {
  //delete current employee
  await Employee.findByIdAndDelete(id);
  const updateShifts = [];
  //get all the shifts
  const shifts = await Shift.find({});
  shifts.forEach((shift) => {
    //for each shift remove the id of the deleted mployee from employeesID array
    shift.employeesId = shift.employeesId.filter((employeeId) => {
      return !employeeId.equals(id);
    });
    //update shifts with new array (withought the deleted employee ID)
    updateShifts.push(Shift.findByIdAndUpdate(shift._id, shift));
  });

  await Promise.all(updateShifts);
  return "Employee deleted!!!";
};

//returns employees that have no departments
const empWithNoDep = async () => {
  const employees = await Employee.find({});
  const empNoDep = employees.filter((emp) => !emp.departmentId);
  const empsWithFormat = empNoDep.map((emp) => ({
    _id: emp._id,
    fullName: emp.firstName + " " + emp.lastName,
    startWorkYear: emp.startWorkYear,
    shifts: emp.shiftsId,
  }));

  return empsWithFormat;
};



module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesWithDep,
  empWithNoDep,

};
