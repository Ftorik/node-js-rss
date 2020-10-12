const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (taskId, boardId) => tasksRepo.get(taskId, boardId);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = id => tasksRepo.remove(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
