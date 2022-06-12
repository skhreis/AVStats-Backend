const express = require('express');
const router = express.Router();
const User = require('./models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config();

router.post('/register', async (req,res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			favorites: [],
		})
		res.json({ status: 'ok'})
	} catch (error) {
		res.json({ status: 'error', error: `${error}`})
	}
})

router.get('/name', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, process.env.JWTKEY)
		const name = decoded.name
		const user = await User.findOne({ name: name })

		return res.json({ status: 'ok', name: user.name })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

router.post('/login', async (req,res) => {
		const user = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		})
		if (user) {
			const token = jwt.sign({
				email: user.email,
			}, process.env.JWTKEY)
			return res.json({ status: 'ok', user: token})
		} else return res.json({ status: 'error', user: false})
})

module.exports = router;