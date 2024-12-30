import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';
import { BoardsStatusValidationPipe } from './pipes/boards-status-validation.pipe';
import { BoardEntity } from './board.entity';

@Controller('boards')
export class BoardsController {
  // BoardsService 의존성 주입
  constructor(private boardsService: BoardsService) {}

  // 모든 게시판 가져오기
  @Get()
  getAllBoard(): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoards();
  }

  // 특정 게시판 가져오기
  @Get('/:id')
  getBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.getBoardByIds(getBoardByIdDto);
  }

  // 게시판 생성하기
  @Post()
  // ValidationPipe로 데이터 유효성 검사
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return this.boardsService.createBoards(createBoardDto);
  }

  // 특정 게시판 삭제하기
  @Delete('/:id')
  // 성공적으로 삭제된 경우 응답 바디 없이 204 No Content 응답
  @HttpCode(204)
  async deleteBoardById(@Param() getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsService.deleteBoardByIds(getBoardByIdDto);
  }

  // 특정 게시판 업데이트하기
  @Put()
  @UsePipes(BoardsStatusValidationPipe)
  updateBoardStatusById(
    @Query()
    updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ) {
    return this.boardsService.updateBoardStatusByIds(updateBoardsStatusByIdDto);
  }
}
