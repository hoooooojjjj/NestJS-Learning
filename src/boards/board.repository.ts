import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';

// BoardEntity를 제어하기 위한 BoardRepository를 생성 -> 엔티티를 컨트롤함.
@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }
}
