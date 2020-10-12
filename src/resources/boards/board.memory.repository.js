const DB = require('../../common/database');
const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Error(`board with id:${id} was not found`);
  }
  return board;
};

const create = async board => DB.createUser(board);

const update = async board => DB.updateBoard(board);

const remove = async id => DB.deleteBoard(id);

module.exports = { getAll, get, create, update, remove };
