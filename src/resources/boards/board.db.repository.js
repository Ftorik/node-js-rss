const Board = require('./board.model');

const getAll = async () => {
  return await Board.find({});
};

const get = async id => {
  return await Board.findById(id);
};

const create = async board => {
  return Board.create(board);
};

const update = async board => {
  return await Board.updateOne({ _id: board.id }, board);
};

const remove = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, remove };
