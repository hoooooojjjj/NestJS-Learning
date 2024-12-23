import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsStatus } from './boards-status-enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BoardsService {
  // BoardRepository 의존성 주입 -> InjectRepository 데코레이터를 통해서 BoardRepository를 레포지토리로 사용한다고 설정해줘야함
  constructor(
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}
  // // 모든 게시판 조회
  // getAllBoards(): Boards[] {
  //   return this.boards;
  // }
  // createBoards(createBoardDto: CreateBoardDto): Boards {
  //   const boardsId = uuid();
  //   const { title } = createBoardDto;
  //   const { description } = createBoardDto;
  //   const newBoard: Boards = {
  //     id: boardsId,
  //     title,
  //     description,
  //     status: BoardsStatus.PUBLIC,
  //   };
  //   this.boards.push(newBoard);
  //   return newBoard;
  // }
  // getBoardByIds(getBoardByIdDto: GetBoardByIdDto) {
  //   const { id } = getBoardByIdDto;
  //   const targetBoard = this.boards.find((board) => board.id === id);
  //   // targetBoard가 존재하지 않으면 404 에러
  //   if (!targetBoard) {
  //     throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
  //   }
  //   return targetBoard;
  // }
  // deleteBoardByIds(getBoardByIdDto: GetBoardByIdDto) {
  //   const { id } = getBoardByIdDto;
  //   const deletedBoard = this.boards.find((board) => board.id === id);
  //   // deletedBoard가 존재하지 않으면 404 에러
  //   if (!deletedBoard) {
  //     throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
  //   }
  //   this.boards = this.boards.filter((board) => board.id !== id);
  //   return deletedBoard;
  // }
  // updateBoardStatusByIds(updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto) {
  //   const { id } = updateBoardsStatusByIdDto;
  //   const { status } = updateBoardsStatusByIdDto;
  //   const targetBoard = this.boards.find((board) => board.id === id);
  //   this.boards = this.boards.map((board) => {
  //     if (board.id === id) {
  //       board.status = status;
  //     }
  //     return board;
  //   });
  //   return targetBoard;
  // }
}
