/*
criar pasta do projeto.
npm init
npm i express body-parser mongoose dotenv cors bcryptjs jsonwebtoken
npm i --dev nodemon

arquivos:
server.js
app.js
.env
models/
 - Todo.js
routes/
 - todo.routes.js
configs/
 - db.config.js
*/

// -- configs/db.config.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log('connected to mongodb!')
  })
  .catch(err => console.error(err));

// -- app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// connect mongodb
require('./configs/db.config');
const cors = require('cors');

const app = express();

// cross-origin
app.use(cors());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes');

// public rotues
app.use('/', authRoutes);

// token middleware
app.use(require('./middlewares/auth.middleware'))

// private routes
app.use('/', todoRoutes);

module.exports = app;

// -- .env
MONGO_URI='mongodb://localhost/server-name'
PORT='5000'
JWT_PASS='my super secret'

// -- server.js
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT, () => console.log('server running!'))

// -- package.json
{
  "scripts": {
    "dev": "nodemon server.js"
  }
}

// -- models/todo.js
const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
  {
    title: String,
    completed: Boolean,
  },
  {
    timestamps: true
  }
)

module.exports = model('Todo', todoSchema);

// -- routes/todo.routes.js
const { Router } = require('express');
const Todo = require('../models/Todo');

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({message: 'Server side error on get todos'});
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = req.body;
    const newTodo = await Todo.create(todo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({message: 'Server side error on create todo'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = req.body;
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, {new: true});
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(500).json({message: 'Server side error on update todo'});    
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndRemove(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({message: 'Server side error on delete todo'});
  }
})

module.exports = router;


// BONUS:
// -- repository/todo.dao.js
const Todo = require("../models/Todo");

class TodoDao {
  cosntructor(TodoModel){
    this.todo = TodoModel;
  }

  async create(todo){
    try {
      const newTodo = await this.todo.create(todo)
      return newTodo;
    } catch (error) {
      throw new Error();
    }
  }

  async update(id, todo){
    try {
      const updatedTodo = await this.todo.findByIdAndUpdate(id, todo, {new: true});
      return updatedTodo;
    } catch (error) {
      throw new Error();
    }
  }
}

module.exports = new TodoDao(Todo);

// -- models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: 5
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    passwordHash: {
      type: String
    }

  }
)

module.exports = model('User', userSchema);

// -- routes/auth.routes.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const router = Router();

const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      passwordHash
    })
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({message: 'Error creating user'})
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }
    const validateHash = bcrypt.compareSync(password, user.passwordHash);
    if (validateHash) {
      const payload = {
        name: user.name,
        email: user.email,
        id: user._id
      }

      const token = jwt.sign(payload, process.env.JWT_PASS, { expiresIn: '1h'});
      res.status(200).json({payload, token})
    }
  } catch (error) {
    res.status(500).json({message: 'Error trying to login'})
  }
})

module.exports = router;

// -- middlewares/auth.middleware.js
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const token = req.get("Authorization")
  if(!token) {
    return res.status(401).json({message: 'token is missing'})
  }
  const tokenWithouthBearer = token.split(' ')[1];
  try {
    const decodedToken = jwt.verify(tokenWithouthBearer, process.env.JWT_PASS)
    req.user = { id: decodedToken.id, name: decodedToken.name }
    next();
  } catch (error) {
    res.status(401).json({message: 'token is invalid or expired'})
  }
}