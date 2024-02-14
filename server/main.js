const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const departmentsRouter = require("./routers/departmentRouter");
const employeesRouter = require("./routers/employeeRrouter");
const shiftsRouter = require("./routers/shiftRouter");
const usersRouter = require("./routers/usersRouter");

const authRouter = require("./routers/authRouter");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/")));

// routers
app.use("/auth", authRouter);
app.use("/departments", departmentsRouter);
app.use("/employees", employeesRouter);
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
