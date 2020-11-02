const User = require('./user.model');
const { SALT_ROUND } = require('../../common/config');
const bcrypt = require('bcrypt');

const getAll = async () => {
  return await User.find({});
};

const get = async id => {
  return await User.findOne({ _id: id });
};

const getByLogin = async login => {
  return await User.findOne({ login });
};

const create = async user => {
  const encryptedPassword = await bcrypt.hash(
    user.password,
    parseInt(SALT_ROUND, 10)
  );
  const newUser = new User({
    login: user.login,
    name: user.name,
    password: encryptedPassword
  });
  return await newUser.save();
};

const update = async user => {
  return await User.updateOne({ _id: user.id }, user);
};

const remove = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, get, getByLogin, create, update, remove };
