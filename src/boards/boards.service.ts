import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsStatus } from './boards-status-enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { UserEntity } from 'src/auth/entity/user.entity';
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

  // 게시판 생성하기
  async createBoards(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    // repository patterns를 사용 -> 데이터베이스 관련(데이터 처리) 코드는 repository 파일에서 처리
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  // 게시판 삭제하기
  async deleteBoardByIds(getBoardByIdDto: GetBoardByIdDto) {
    return this.boardsRepository.deleteBoard(getBoardByIdDto);
  }

  // 게시판 상태 업데이트하기
  async updateBoardStatusByIds(
    updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ): Promise<BoardEntity> {
    return this.boardsRepository.updateBoardStatus(updateBoardsStatusByIdDto);
  }
}
