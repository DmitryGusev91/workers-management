const User = require("../models/userModel");
const uf = require("../DAL/usersFile");

//get all users
const getAllUsers = (filters) => {
  return User.find(filters);
};

//get user by ID
const getUserById = (id) => {
  return User.findById({ _id: id });
};

//update user by ID
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
  return "User Updated!!;";
};

//add User
const addUser = async (obj) => {
  const user = new User(obj);
  await user.save();
  return "User created!!";
};

//delete user by ID
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return "User deleted!!!";
};

//write users info into a JSON
const writeToFile = async (obj) => {
  const {actions} = await uf.readFile();
  actions.push(obj);
  const data = { actions };
  return uf.writeFile(data);
};



module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  writeToFile
};
