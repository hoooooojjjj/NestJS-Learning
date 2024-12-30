import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsStatus } from './boards-status-enum';

// BoardEntity를 제어하기 위한 BoardRepository를 생성 -> 엔티티를 컨트롤함.
@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

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
}
