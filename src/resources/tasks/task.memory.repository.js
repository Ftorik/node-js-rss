const DB = require('../../common/database');

const getAll = async () => DB.getAllTasks();

module.exports = { getAll };
