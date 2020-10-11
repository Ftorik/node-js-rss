const DB = require('../../common/database');
const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`user with id:${id} was not found`);
  }
  return user;
};

const create = async user => DB.createUser(user);

const update = async user => DB.updateUser(user);

const remove = async id => DB.deleteUser(id);

module.exports = { getAll, get, create, update, remove };
