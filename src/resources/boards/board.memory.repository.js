const DB = require('../../common/database');
const getAll = async () => DB.getAllBoards();

module.exports = { getAll };
