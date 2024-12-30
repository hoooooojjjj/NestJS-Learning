import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsStatus } from './boards-status-enum';
import { GetBoardByIdDto } from './dto/get-board-by-id.dto';

// BoardEntity를 제어하기 위한 BoardRepository를 생성 -> 엔티티를 컨트롤함.
@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  // 게시판 생성 메소드
  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, description } = createBoardDto;

    // 데이터베이스에 데이터를 생성하기 위해선 create 메서드로 BoardEntity 인스턴스를 생성
    const newBoard = this.create({
      title,
      description,
      status: BoardsStatus.PUBLIC,
    });

    // 그리고 save 메서드를 통해서 생성한 BoardEntity 인스턴스를 데이터베이스에 저장
    await this.save(newBoard);

    return newBoard;
  }

  // 게시판 삭제 메소드
  async deleteBoard(getBoardByIdDto: GetBoardByIdDto) {
    const { id } = getBoardByIdDto;

    // 해당 id를 가진 게시판을 제거
    // remove 메서드는 찾는 column이 없으면 바로 404 에러를 반환
    // delete 메서드는 찾는 Colum이 없어도 404 에러를 반환하지 않음
    // 그렇기 때문에 remove 메서드를 사용할 때 값이 없으면 무조건 404 에러를 반환하게 되기
    // 때문에 그렇게 하고 싶지 않으면 findOne 메서드를 사용해서 값이 존재하는지 확인하는
    // 작업이 한번 더 필요함. 그래서 delete 메서드를 사용
    const deletedResult = await this.delete({
      id,
    });

    // deletedBoard가 존재하지 않으면 404 에러
    // affected는 영향을 받은 column의 수
    if (deletedResult.affected === 0) {
      throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
    }
  }
}
