const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("../BLL/usersWebBLL");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, email } = req.body;
  //checks if name and email is in the db(web),if yes then creates token
  if (await users.verifyUser(username, email)) {
    const userId = username;
    const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;
    const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN, {
      expiresIn: "2h",
    });

    return res.json({ accessToken });
  }
  return res.status(401);
});

module.exports = router;
