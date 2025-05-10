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
			userIf: result.rows[0].id
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

module.exports = router;
