const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken')

require('dotenv').config();

router.get('/favorites', async (req,res) => {
	const token = req.headers['x-access-token']
	try{
		const decoded = jwt.verify(token, process.env.JWTKEY)
		const email = decoded.email
		const obj = await User.findOne({ email })
		return res.json({ status: 'ok', favorites: obj})
	}
	catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'something went wrong'})
	}
})

router.put('/favorites/airport', async (req,res) => {
	const token = req.headers['x-access-token']
	try{
		const decoded = jwt.verify(token, process.env.JWTKEY)
		const email = decoded.email
		const favorite = await User.findOneAndUpdate({email: email}, {$push: {favorites: req.body.airport }})
		return res.json({status: 'ok', added: req.body.airport})
	}
	catch (error) {
		console.log(error)
		res.json({status: 'error', error: error, token: token})
	}
})

router.delete('/favorites/airport/delete', async (req,res) => {
	const token = req.headers['x-access-token']
	try{
		const decoded = jwt.verify(token, process.env.JWTKEY)
		const email = decoded.email
		await User.findOneAndUpdate({email: email}, {$pull: {favorites: req.body.airport }})
		return res.json({status: 'ok', deleted: req.body.airport})
	}
	catch (error) {
		console.log(error)
		res.json({status: 'error', error: error, token: token})
	}
})


module.exports = router