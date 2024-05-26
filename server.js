const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/todosbackend',);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
