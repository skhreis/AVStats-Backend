const express = require('express')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();



app.use(cors())
app.use(express.json())	

const connectionStr = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI)
// mongoDB success
mongoose.connection.on('connected', ()=>{console.log('connected')});
// mongoDB error
mongoose.connection.on('error',(error)=>{console.log('error')});
// mongoDB disconnect
mongoose.connection.on('disconnected',()=>{console.log('disconnected')});

app.post('/register', async (req,res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok'})
	} catch (error) {
		res.json({ status: 'error', error: 'Duplicate email'})
	}
})
app.post('/login', async (req,res) => {
		const user = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		})
		if (user) {
			return res.json({ status: 'ok', user: true})
		} else return res.json({ status: 'error', user: false})
})

app.listen(5000, () => {
	console.log('Server Started')
})