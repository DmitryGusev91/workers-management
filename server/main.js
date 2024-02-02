const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const departmentsRouter = require("./routers/departmentRouter");
const employeesRouter = require("./routers/employeeRrouter");
const shiftsRouter = require("./routers/shiftRouter");
const usersRouter = require("./routers/usersRouter");

const authRouter = require("./routers/authRouter");

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use("/auth", authRouter);
app.use("/departments", departmentsRouter);
app.use("/employees", employeesRouter);
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
