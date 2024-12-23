import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

// app module에서 import하여 typeorm 사용
@Module({
  imports: [BoardsModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
