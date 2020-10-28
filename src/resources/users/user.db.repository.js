const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findOne({ _id: id });
};

const create = async user => {
  return User.create(user);
};

const update = async user => {
  return await User.updateOne({ _id: user.id }, user);
};

const remove = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, remove };
