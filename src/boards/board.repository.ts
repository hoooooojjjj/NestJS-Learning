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
  async deleteBoard(getBoardByIdDto: GetBoardByIdDto): Promise<BoardEntity> {
    const { id } = getBoardByIdDto;

    // 지울 게시물 찾기
    const deletedBoard = await this.findOne({
      where: {
        id: id,
      },
    });

    // deletedBoard가 존재하지 않으면 404 에러
    if (!deletedBoard) {
      throw new NotFoundException(` id가 ${id}인 게시물이 존재하지 않습니다`);
    }

    // 해당 id를 가진 게시판을 제거
    await this.delete({
      id,
    });

    return;
  }
}
