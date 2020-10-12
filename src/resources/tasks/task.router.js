const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.taskId, req.params.boardId);
    res.json(task);
  } catch (e) {
    res.status(404).send(`Error: ${e.message}`);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      boardId: req.params.boardId,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    new Task({
      id: req.params.taskId,
      boardId: req.params.boardId,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.taskId);
    res.status(204).send('Task has been deleted');
  } catch (e) {
    res.status(404).send(`Error: ${e.message}`);
  }
});

module.exports = router;
