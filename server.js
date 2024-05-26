const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 5000 || process.env.PORT;

mongoose.connect('mongodb+srv://developerzaidbashir:Zaid123@todoscluster.r4glsup.mongodb.net/?retryWrites=true&w=majority&appName=todoscluster',);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
