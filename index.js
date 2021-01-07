const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('Database is connected')
);
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server is running'));
