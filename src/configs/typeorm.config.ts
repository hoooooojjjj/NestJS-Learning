import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// typeOrm을 통해서 NestJS와 데이터베이스 연동
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
};
