import { BoardEntity } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
// 엔티티 레벨에서 @Unique 데코레이터를 사용하여 유니크한 값을 지정할 수 있음
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // username이 필수값임을 명시
  username: string;

  @Column({ nullable: false }) // password도 필수값으로 설정
  password: string;

  // 유저와 게시판 엔티티 간의 관계를 설정 -> 유저가 여러 개의 게시판을 가질 수 있음을 명시
  // type: 게시판 엔티티를 가리키는 타입
  // board: 게시판 엔티티를 가리키는 변수 -> BoardEntity에서 user를 어떻게 가져오는지 지정
  // eager: true는 유저를 가져올 때 게시판도 함께 가져오도록 설정
  // eager: false는 유저를 가져올 때 게시판을 가져오지 않도록 설정
  @OneToMany((type) => BoardEntity, (board) => board.user, { eager: true })
  boards: BoardEntity[];
}
