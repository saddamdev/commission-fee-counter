const fs = require('node:fs');
const axios = require('axios');

// a class of fetching data from local or online
class FetchData {
  constructor(fileName) {
    // setting parsed json data to this transActions propertie
    this.transActions = this.getDataFromLocalFile(fileName);
  }

  // this method can read local file and returns parsed json data
  getDataFromLocalFile = (filePath) => {
    const file = fs.readFileSync(filePath);
    const data = JSON.parse(file);
    return data;
  };

  // this method can call any API and returns parsed json data
  getDataFromApi = (api) => {
    try {
      const data = axios.get(api).then((res) => res.data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = FetchData;
