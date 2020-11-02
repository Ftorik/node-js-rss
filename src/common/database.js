const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const usersRepo = require('../resources/users/user.db.repository');

const createAdmin = async () => {
  const admin = { name: 'admin', login: 'admin', password: 'admin' };
  const isAdminExisted = await usersRepo.getByLogin(admin.login);
  if (!isAdminExisted) {
    await usersRepo.create(admin);
  }
};

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
  db.once('open', async () => {
    console.log('Connected!');
    db.dropDatabase();
    await createAdmin();
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = {
  connectToDB
};
