import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsStatus } from './boards-status-enum';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';
import { UpdateBoardsStatusByIdDto } from './dto/update-boardstatus-by-id.dto';
import { UserEntity } from 'src/auth/entity/user.entity';

// BoardEntity를 제어하기 위한 BoardRepository를 생성 -> 엔티티를 컨트롤함.
@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  // 게시판 생성 메소드
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    const { title, description } = createBoardDto;

    // 데이터베이스에 데이터를 생성하기 위해선 create 메서드로 BoardEntity 인스턴스를 생성
    const newBoard = this.create({
      title,
      description,
      status: BoardsStatus.PUBLIC,
      user, //  게시판 생성 시 유저 정보도 함께 저장
    });

    // 그리고 save 메서드를 통해서 생성한 BoardEntity 인스턴스를 데이터베이스에 저장
    await this.save(newBoard);

    return newBoard;
  }

  // 게시판 삭제 메소드
  async deleteBoard(getBoardByIdDto: GetBoardByIdDto, user: UserEntity) {
    const { id } = getBoardByIdDto;

    // 해당 id를 가진 게시판을 제거 + 자신의 게시물인지도 확인
    // remove 메서드는 찾는 column이 없으면 바로 404 에러를 반환
    // delete 메서드는 찾는 Colum이 없어도 404 에러를 반환하지 않음
    // 그렇기 때문에 remove 메서드를 사용할 때 값이 없으면 무조건 404 에러를 반환하게 되기
    // 때문에 그렇게 하고 싶지 않으면 findOne 메서드를 사용해서 값이 존재하는지 확인하는
    // 작업이 한번 더 필요함. 그래서 delete 메서드를 사용
    const deletedResult = await this.delete({
      user, // 자신의 게시물인지
      id, // 해당 id를 가진 게시판
    });

    // deletedBoard가 존재하지 않으면 404 에러
    // affected는 영향을 받은 column의 수
    if (deletedResult.affected === 0) {
      throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
    }
  }

  // 게시판 상태 업데이트 메소드
  async updateBoardStatus(
    updateBoardsStatusByIdDto: UpdateBoardsStatusByIdDto,
  ): Promise<BoardEntity> {
    const { id, status } = updateBoardsStatusByIdDto;

    // 업데이트 시에는 데이터를 반환해주는 것이 관례,
    // 그래서 update 메서드를 쓰는 것보다 인스턴스를 변경하고 save하는 것도 방법

    // 해당 id인 게시판 찾기
    const targetBoard = await this.findOne({
      where: {
        id,
      },
    });

    // 없으면 404 에러
    if (!targetBoard) {
      throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
    }

    // 해당 게시판 상태 업데이트
    targetBoard.status = status;

    // 업데이트 저장
    await this.save(targetBoard);

    // 업데이트된 게시판 반환
    return targetBoard;
  }
}
