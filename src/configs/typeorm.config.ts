import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BoardEntity } from 'src/boards/board.entity';

// typeOrm을 통해서 NestJS와 데이터베이스 연동
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [BoardEntity], // 엔티티 추가
  synchronize: true, // 개발 환경에서만 사용 권장
};
