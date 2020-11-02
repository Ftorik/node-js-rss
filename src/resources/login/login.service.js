const usersRepo = require('../users/user.db.repository');
const config = require('../../common/config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async authData => {
  const user = await usersRepo.getByLogin(authData.login);

  if (user) {
    const isPasswordValid = await bcrypt.compare(
      authData.password,
      user.password
    );

    if (isPasswordValid) {
      return JWT.sign(
        { userId: user._id, login: user.login },
        config.JWT_SECRET_KEY
      );
    }
  }
};

module.exports = { login };
