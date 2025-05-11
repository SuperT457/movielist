const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

router.post('/register', async(req,res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({error: 'Username e password richiesti' });
	}

	try{
		const passwordHash = await bcrypt.hash(password,10);
		const result = await pool.query(
			'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
			[username, passwordHash]
		);

		res.status(201).json({
			message: 'Utente creato con successo',
			userId: result.rows[0].id
		});
	}catch(err){
		console.error(err);
		if(err.code === '23505'){
			res.status(400).json({ error: 'Username already in use' });
		}else{
			res.status(500).json({ error: 'Server error' });
		}
	}
});

//procedura di login

const jwt = require('jsonwebtoken');
const SECRET = 'supersegreto';

router.post('/login', async(req,res) => {
	const { username, password } = req.body;

	try{
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
		const user = result.rows[0];

		if(!user){
			return res.status(401)({error: 'Credenziali non valide' });
		}

		const isValid = await bcrypt.compare(password,user.password_hash);
		if(!isValid){
			return res.status(401).json({ error: 'Credenziali non valide '});
		}

		const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
		res.json({ message: 'Login effettuato con successo',token });

	}catch(err){
		console.error('Errore login:',err);
		res.status(500).json({ error: 'Errore interno '});
	}
});

module.exports = router;
