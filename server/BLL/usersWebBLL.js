const usersWS = require("../DAL/usersWS");

//searches through all the users and if find a mach returns true else false
//need this for user login verification of user existence
const verifyUser = async (name, email) => {
  const { data: users } = await usersWS.getAllUsers();
  //decided to search if exists by searching for index
  const index = users.findIndex(
    (user) => user.name === name && user.email === email
  );

  if (index !== -1) return true;
  return false;
};

module.exports = { verifyUser };
