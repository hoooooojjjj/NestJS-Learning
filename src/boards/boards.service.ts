import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  // 로그 출력을 위한 로거 생성
  private logger = new Logger('Boards');

  // 모든 게시판 조회
  async getAllBoards(): Promise<BoardEntity[]> {
    const allBoards = await this.boardsRepository.find();

    // 게시판이 존재하지 않을 때 404
    if (allBoards.length === 0) {
      throw new NotFoundException('현재 게시판이 존재하지 않습니다.');
    }

    this.logger.verbose(`${allBoards.length}개의 게시판이 조회되었습니다.`);

    return allBoards;
  }

  // 특정 유저의 게시판 조회
  async getUserBoardByUserId(
    user: UserEntity,
  ): Promise<BoardEntity | BoardEntity[]> {
    // @GetUser로 받아온 엑세스 토큰 payload에 있는 user 객체를 통해 해당 유저의 게시판 찾기

    // 그냥 일반적인 repository api로 찾기 -> 간단한 쿼리에서는 이걸 추천
    // const userBoards = await this.boardsRepository.findBy({
    //   user,
    // });

    // 쿼리 빌더를 사용해서 찾기 -> 복잡한 쿼리에서는 이걸 추천
    const userBoards = await this.boardsRepository
      .createQueryBuilder('board_entity') // board_entity 테이블에서 쿼리 빌더를 생성
      .where('board_entity.userId = :userId', { userId: user.id }) // board_entity의 userId 필드가 user.id 인것만
      .getMany(); // 모두 가져오기

    // 없으면 404 에러 반환
    if (!userBoards) {
      throw new NotFoundException('해당 유저의 게시판이 존재하지 않습니다');
    }

    this.logger.verbose(
      `${user.username} 유저의 ${userBoards.length}개의 게시판이 조회되었습니다.`,
    );

    return userBoards;
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
  async deleteBoardByIds(getBoardByIdDto: GetBoardByIdDto, user: UserEntity) {
    return this.boardsRepository.deleteBoard(getBoardByIdDto, user);
  }

  // 게시판 상태 업데이트하기
  async updateBoardStatusByIds(
    updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ): Promise<BoardEntity> {
    return this.boardsRepository.updateBoardStatus(updateBoardsStatusByIdDto);
  }
}
