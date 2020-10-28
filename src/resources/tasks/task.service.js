const tasksRepo = require('./task.db.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (taskId, boardId) => tasksRepo.get(taskId, boardId);

const getByUserId = userId => tasksRepo.getByUserId(userId);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = id => tasksRepo.remove(id);

module.exports = {
  getAll,
  get,
  getByUserId,
  create,
  update,
  remove
};
