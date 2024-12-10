import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Request } from 'express';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Req() request: Request) {
    return this.boardsService.getBoardById(Number(request.params.id));
  }

  @Post('/:id/columns')
  createColumn(@Req() request: Request, @Body() req: any) {
    return this.boardsService.createColumn(
      Number(request.params.id),
      request.body,
    );
  }

  @Delete('/:id/columns/:column_id')
  deleteColumn(@Req() request: Request) {
    return this.boardsService.deleteColumn(Number(request.params.column_id));
  }
}
