const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/companyDBtest';
else dbUri = 'mongodb://0.0.0.0:27017/companyDB';

if (mongoose.connection.readyState === 0) {
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
}

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

let server;
if (NODE_ENV !== 'test') {
  server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });
}

module.exports = app;
