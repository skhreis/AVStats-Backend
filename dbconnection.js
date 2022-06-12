const mongoose = require('mongoose');

require('dotenv').config();

const connectionStr = process.env.MONGODB_URI;
mongoose.connect(connectionStr);