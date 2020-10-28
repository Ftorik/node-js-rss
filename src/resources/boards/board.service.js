const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const remove = async id => {
  await boardsRepo.remove(id);
  const tasks = await tasksRepo.getAll(id);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    await tasksRepo.remove({ _id: task.id });
  }
};

module.exports = { getAll, get, create, update, remove };
