const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json())	

const connectionStr = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI)

app.post('/register', async (req,res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok'})
	} catch (error) {
		res.json({ status: 'error', error: `${error}`})
	}
})

app.get('/name', async (req, res) => {
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

app.post('/login', async (req,res) => {
		const user = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		})
		if (user) {
			const token = jwt.sign({
				name: user.name,
				email: user.email
			}, process.env.JWTKEY)
			return res.json({ status: 'ok', user: token})
		} else return res.json({ status: 'error', user: false})
})


app.listen(5000, () => {
	console.log('Server Started')
})