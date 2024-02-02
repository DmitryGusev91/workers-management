const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/users";

//get all useres from db in cloud
const getAllUsers = () => {
  return axios.get(url);
};

module.exports = { getAllUsers };
