const express = require("express");
const usersBLL = require("../BLL/usersBLL");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

//get all employees (or filtered ones) after checking authentication
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
    const users = await usersBLL.getAllUsers(filters);
    return res.json(users); // 200 - OK
  });
});

// Get user by ID after checking authentication
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
    const user = await usersBLL.getUserById(id);
    return res.json(user);
  });
});

// Add a new user after checking authentication
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
    const result = await usersBLL.addUser(obj);
    return res.status(201).json(result);
  });
});

// Update a user after checking authentication
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
    const result = await usersBLL.updateUser(id, obj);
    return res.json(result);
  });
});

// Delete a user after checking authentication
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
    const result = await usersBLL.deleteUser(id);
    return res.json(result);
  });
});

//Write user to file (JSON)
router.route("/log").post(async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json("No token provided");
  }
  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }

    const obj = req.body;
    const result = await usersBLL.writeToFile(obj);
    return res.status(201).json(result);
  });
});

module.exports = router;
