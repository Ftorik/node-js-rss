const Task = require('./task.model');

const getAll = async id => {
  return await Task.find({ boardId: id });
};

const get = async (taskId, boardId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const getByUserId = async userId => {
  return await Task.find({ userId });
};

const create = async task => {
  return Task.create(task);
};

const update = async task => {
  return await Task.updateOne({ boardId: task.boardId, _id: task.id }, task);
};

const remove = async id => {
  return await Task.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  get,
  getByUserId,
  create,
  update,
  remove
};
