const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [
      {
        id: uuid(),
        title: 'COLUMN TITLE',
        order: 1
      },
      {
        id: uuid(),
        title: 'COLUMN TITLE2',
        order: 2
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
