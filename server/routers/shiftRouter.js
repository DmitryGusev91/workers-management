const express = require("express");
const shiftsBLL = require("../BLL/shiftsBLL");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

//return all shifts
router.route("/").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }

    const shifts = await shiftsBLL.getAllShifts();

    return res.json(shifts); // 200 - OK
  });
});

// Get shift by ID
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
    const shift = await shiftsBLL.getShiftById(id);
    return res.json(shift);
  });
});

// Add a new shift
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
    const result = await shiftsBLL.addShift(obj);
    return res.status(201).json(result);
  });
});

// Update a shift
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
    const result = await shiftsBLL.updateShift(id, obj);
    return res.json(result);
  });
});

// Delete a shift
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
    const result = await shiftsBLL.deleteShift(id);
    return res.json(result);
  });
});

//returns all the employees that are NOT in a specific shift
router.route("/:id/empNotInShift").get(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    const { id } = req.params;
    const employees = await shiftsBLL.empNotInShift(id);
    return res.json(employees);
  });
});

module.exports = router;
