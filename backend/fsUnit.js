const fs = require("fs");
const readJsonFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (error, data) =>
      error ? reject(error) : resolve(JSON.parse(data.toString()))
    )
  );

const writeJsonFile = (path, jsonObj) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, JSON.stringify(jsonObj, null, 2), (err) =>
      err ? reject(err) : resolve(jsonObj)
    )
  );

module.exports = {
  readJsonFile,
  writeJsonFile,
};
