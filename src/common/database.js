const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = [];
const tasks = [];

DB.push(new User(), new User());
DB.push(new Board(), new Board());

const getAllUsers = async () => DB;
const getAllBoards = async () => DB;

const getAllTasksByBoardID = async boardId =>
  tasks.filter(el => el.boardId === boardId);

const getUser = async id => DB.filter(el => el.id === id)[0];
const getBoard = async id => DB.filter(el => el.id === id)[0];
const getTask = async (id, boardId) =>
  tasks.filter(el => el.id === id && el.boardId === boardId)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};
const createBoard = async board => {
  DB.push(board);
  return board;
};
const createTask = async task => {
  tasks.push(task);
  return task;
};

const updateUser = async user => {
  const id = DB.find(el => el.id === user.id);
  id.name = user.name;
  id.login = user.login;
  id.password = user.password;
  return id;
};
const updateBoard = async board => {
  const id = DB.find(el => el.id === board.id);
  id.title = board.title;
  id.columns = board.columns;
  return id;
};
const updateTask = async task => {
  const id = tasks.find(el => el.id === task.id);
  id.boardId = task.boardId;
  id.title = task.title;
  id.order = task.order;
  id.description = task.description;
  id.userId = task.userId;
  id.columnId = task.columnId;
  return id;
};

const deleteUser = async id => {
  const index = DB.findIndex(el => el.id === id);
  if (index > -1) DB.splice(index, 1);
  return DB;
};
const deleteBoard = async id => {
  const index = DB.findIndex(el => el.id === id);
  if (index > -1) DB.splice(index, 1);
  return DB;
};
const deleteTask = async id => {
  const index = tasks.findIndex(el => el.id === id);
  if (index > -1) tasks.splice(index, 1);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllTasksByBoardID,
  createTask,
  getTask,
  updateTask,
  deleteTask
};
