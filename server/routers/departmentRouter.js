const express = require("express");
const departmentsBLL = require("../BLL/departmentsBLL");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

//get all departments
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
    const departments = await departmentsBLL.getAllDepartments(filters);
    return res.json(departments); // 200 - OK
  });
});

//get all department info including managers info
router.route("/manager").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }
  console.log(ACCESS_SECRET_TOKEN)
  console.log(token);
  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const departments = await departmentsBLL.getDepWithEmp();
    return res.json(departments); // 200 - OK
  });
});

//returns departments that dont have a manager
router.route("/nomanager").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const departments = await departmentsBLL.getDepWithNoEmp();
    return res.json(departments); // 200 - OK
  });
});

// Get department by ID
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
    const department = await departmentsBLL.getDepartmentById(id);
    return res.json(department);
  });
});

// Add a new department
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
    const result = await departmentsBLL.addDepartment(obj);
    return res.status(201).json(result);
  });
});

// Update a department
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
    const result = await departmentsBLL.updateDepartment(id, obj);
    return res.json(result);
  });
});

// Delete a department
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
    const result = await departmentsBLL.deleteDepartment(id);
    return res.json(result);
  });
});

module.exports = router;
