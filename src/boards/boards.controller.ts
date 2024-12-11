import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Boards } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Boards[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Boards {
    return this.boardsService.createBoards(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.getBoardByIds(getBoardByIdDto);
  }

  @Delete('/:id')
  deleteBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.deleteBoardByIds(getBoardByIdDto);
  }

  @Put()
  updateBoardStatusById(
    @Query() updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ) {
    return this.boardsService.updateBoardStatusByIds(updateBoardsStatusByIdDto);
  }
}
