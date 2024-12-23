import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsStatus } from './boards-status-enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
@Injectable()
export class BoardsService {
  // BoardRepository 의존성 주입 -> InjectRepository 데코레이터를 통해서 BoardRepository를 레포지토리로 사용한다고 설정해줘야함
  constructor(
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}

  // 모든 게시판 조회
  async getAllBoards(): Promise<BoardEntity[]> {
    const allBoards = await this.boardsRepository.find();

    // 게시판이 존재하지 않을 때 404
    if (allBoards.length === 0) {
      throw new NotFoundException('현재 게시판이 존재하지 않습니다.');
    }

    return allBoards;
  }

  createBoards(createBoardDto: CreateBoardDto): BoardEntity {
    const { title } = createBoardDto;
    const { description } = createBoardDto;

    const newBoard = this.boardsRepository.create({
      title,
      description,
    });

    console.log(newBoard);

    return newBoard;
  }

  // id로 특정 게시판 찾기
  async getBoardByIds(getBoardByIdDto: GetBoardByIdDto): Promise<BoardEntity> {
    const { id } = getBoardByIdDto;

    const targetBoard = await this.boardsRepository.findOne({
      where: {
        id: id,
      },
    });

    // targetBoard가 존재하지 않으면 404 에러
    if (!targetBoard) {
      throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
    }

    return targetBoard;
  }

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
