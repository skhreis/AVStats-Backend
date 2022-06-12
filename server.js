const express = require('express')
const methodOverride = require('method-override')
const loginRouter = require('./login_controller')
const favoriteRouter = require('./favorites_controller')

const cors = require('cors')
const app = express()

require('dotenv').config();
require('./dbconnection.js')

app.use(methodOverride('_method'))
app.use(cors())
app.use(express.json())	
app.use(express.urlencoded({ extended: false }));
app.use('', loginRouter)
app.use('', favoriteRouter)


app.listen(8000, () => {
	console.log('Server Started on port 8000')
})