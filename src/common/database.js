const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'Zalax', login: 'login1', password: 'qwerty' }),
  new User({ name: 'Vasya', login: 'login2', password: 'qwerty123' })
];

const boards = [
  new Board({ title: 'board1', columns: [] }),
  new Board({ title: 'board2', columns: [] })
];

const tasks = [
  new Task({
    title: 'task1',
    order: 0,
    description: 'descr1',
    userId: '',
    boardId: '',
    columnId: ''
  }),
  new Task({
    title: 'task2',
    order: 0,
    description: 'descr2',
    userId: '',
    boardId: '',
    columnId: ''
  })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = {
  connectToDB
};
