const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const ChargeDBWithApi = require("./src/ChargeDB/ChargeDBWithApi.js");
const PORT = 3001;

conn.sync({ force: true }).then(() => {
 ChargeDBWithApi()
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
