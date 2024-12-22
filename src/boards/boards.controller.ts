import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Boards } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // 모든 게시판 가져오기
  @Get()
  getAllBoard(): Boards[] {
    return this.boardsService.getAllBoards();
  }

  // 게시판 생성하기
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Boards {
    return this.boardsService.createBoards(createBoardDto);
  }

  // 특정 게시판 가져오기
  @Get('/:id')
  getBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.getBoardByIds(getBoardByIdDto);
  }

  // 특정 게시판 삭제하기
  @Delete('/:id')
  deleteBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.deleteBoardByIds(getBoardByIdDto);
  }

  // 특정 게시판 업데이트하기
  @Put()
  updateBoardStatusById(
    @Query() updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ) {
    return this.boardsService.updateBoardStatusByIds(updateBoardsStatusByIdDto);
  }
}
