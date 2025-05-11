const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res) => {
	res.redirect('/login.html');
});

const usersRoute = require('./routes/users');
app.use('/api', usersRoute);

const authRoute = require('./routes/auth');
app.use('/api', authRoute);

app.listen(3000, () => {
  //console.log('Server in ascolto sulla porta 3000');
});

