const jf = require("jsonfile");
const file = "./server/data/actions.json";

//read users from JSON
const readFile = () => {
  return jf.readFile(file);
};

//write users to JSON
const writeFile = async (obj) => {
  await jf.writeFile(file, obj);
  return "Saved to File successfully!!";
};

module.exports = { readFile, writeFile };
