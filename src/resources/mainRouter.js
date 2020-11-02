const userRouter = require('./users/user.router');
const boardRouter = require('./boards/board.router');
const taskRouter = require('./tasks/task.router');
const loginRouter = require('./login/login.router');
const checkAuthorizationToken = require('../middlewares/check-token');

module.exports = app => {
  app.use('/login', loginRouter);
  app.use('/users', checkAuthorizationToken, userRouter);
  app.use('/boards', checkAuthorizationToken, boardRouter);
  boardRouter.use('/:boardId/tasks', taskRouter);
};
