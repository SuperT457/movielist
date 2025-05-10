const express = require('express');
const app = express();

app.use(express.json());

const usersRoute = require('./routes/users');
app.use('/api', usersRoute);

app.listen(3000, () => {
  console.log('Server in ascolto sulla porta 3000');
});

