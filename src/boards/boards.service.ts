import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  board = {
    id: 1,
    title: 'First board',
    columns: [
      {
        id: 1,
        title: 'Column 1',
        order: 1,
      },
      {
        id: 2,
        title: 'Column 2',
        order: 2,
      },
    ],
  };

  getAllBoards(): any {
    return this.board;
  }

  getBoardById(id: number): any {
    return this.board.id === id ? this.board : null;
  }

  createColumn(id: any, column: any): any {
    this.board.columns.push(column);
    return column;
  }

  deleteColumn(column_id: any): any {
    const deletedColumn = this.board.columns.find(
      (column) => column.id === column_id,
    );
    this.board.columns = this.board.columns.filter(
      (column) => column.id !== column_id,
    );
    return deletedColumn;
  }
}
