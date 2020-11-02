const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await usersRepo.getAll();

const get = async id => await usersRepo.get(id);

const create = async user => await usersRepo.create(user);

const update = async user => await usersRepo.update(user);

const remove = async id => {
  await usersRepo.remove(id);
  const userTasks = await taskService.getByUserId(id);

  for (const task of userTasks) {
    task.userId = null;
    await taskService.update(task);
  }
};

module.exports = { getAll, get, create, update, remove };
