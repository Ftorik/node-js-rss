const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const DB = [];

DB.push(new User(), new User());
DB.push(new Board(), new Board());

const getAllUsers = async () => DB;
const getAllBoards = async () => DB;

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async user => {
  const id = DB.find(el => el.id === user.id);
  id.name = user.name;
  id.login = user.login;
  id.password = user.password;
  return id;
};

const deleteUser = async id => {
  const index = DB.findIndex(el => el.id === id);
  if (index > -1) DB.splice(index, 1);
  return DB;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards
};
