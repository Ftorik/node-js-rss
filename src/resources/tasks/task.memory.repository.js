const DB = require('../../common/database');

const getAll = async id => DB.getAllTasksByBoardID(id);

const get = async (taskId, boardId) => {
  const task = await DB.getTask(taskId, boardId);
  if (!task) {
    throw new Error(`task with id:${taskId} was not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async task => DB.updateTask(task);

const remove = async id => DB.deleteTask(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
