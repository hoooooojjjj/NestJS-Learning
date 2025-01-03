import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // board module에 BoardEntity import
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule],
  controllers: [BoardsController],
  // BoardRepository provider 등록
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
