const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = async id => {
  await usersRepo.remove(id);
  const userTasks = await taskService.getByUserId(id);

  for (const task of userTasks) {
    task.userId = null;
    await taskService.update(task);
  }
};

module.exports = { getAll, get, create, update, remove };
