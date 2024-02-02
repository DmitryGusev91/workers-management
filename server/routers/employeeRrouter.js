const express = require("express");
const employeesBLL = require("../BLL/employeesBLL");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

//returns all the employees and filtered ones too
router.route("/").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const filters = req.query;
    const employees = await employeesBLL.getAllEmployees(filters);
    return res.json(employees); // 200 - OK
  });
});

//fetches all employees withought departments
router.route("/nodepartment").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const employees = await employeesBLL.empWithNoDep();
    return res.json(employees); // 200 - OK
  });
});

//return all employees in a specific department
router.route("/departments").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const filter = req.query;
    const employees = await employeesBLL.getEmployeesWithDep(filter);
    return res.json(employees); // 200 - OK
  });
});

// Get employee by ID
router.route("/:id").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const { id } = req.params;
    const employee = await employeesBLL.getEmployeeById(id);
    return res.json(employee);
  });
});

// Add a new employee
router.route("/").post(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const obj = req.body;
    const result = await employeesBLL.addEmployee(obj);
    return res.status(201).json(result);
  });
});

// Update a employee
router.route("/:id").put(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesBLL.updateEmployee(id, obj);
    return res.json(result);
  });
});

// Delete a employee
router.route("/:id").delete(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const { id } = req.params;
    const result = await employeesBLL.deleteEmployee(id);
    return res.json(result);
  });
});

module.exports = router;
