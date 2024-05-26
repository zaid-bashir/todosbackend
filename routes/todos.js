const express = require('express');
const Todo = require('../models/todos');

const router = express.Router();

router.post('/', async (req, res) => {
  const todo = new Todo({
    ...req.body,
    user: req.user._id
  });

  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.send(todos);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const todo = await Todo.findOne({ _id, user: req.user._id });

    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['text', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach(update => (todo[update] = req.body[update]));
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
