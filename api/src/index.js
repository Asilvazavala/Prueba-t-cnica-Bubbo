const app = require('./app');
require('dotenv').config();

const {
  PORT
} = process.env

app.listen(PORT, () => {
  console.log(`El servidor se inició en el puerto: ${PORT}`);
});