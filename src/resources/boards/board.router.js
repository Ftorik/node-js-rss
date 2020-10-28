const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.boardId);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(`Error: ${e.message}`);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(
    new Board({
      _id: req.params.boardId,
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardService.remove(req.params.boardId);
    res.status(200).json(null);
  } catch (e) {
    res.status(404).send(`Error: ${e.message}`);
  }
});

module.exports = router;
