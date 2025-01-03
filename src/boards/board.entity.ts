import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardsStatus } from './boards-status-enum';
import { UserEntity } from 'src/auth/entity/user.entity';

// typeorm을 통해서 데이터베이스 테이블을 만들기 위해선 entity를 정의해야 한다.
// 아래와 같이 BaseEntity를 상속 받아서 BoardEntity라는 클래스를 만들고 멤버로 각 테이블의 열을 만들어줄 수 있다.
// 이렇게 만들어진 클래스는 typeorm을 사용하여 데이터베이스의 관계형 테이블로 만들어지게 된다.
@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: BoardsStatus.PUBLIC })
  status: BoardsStatus;

  // 유저와 게시판 엔티티 간의 관계를 설정 -> 게시판은 하나의 유저만 가질 수 있음을 명시
  // type: 유저 엔티티를 가리키는 타입
  // user: 유저 엔티티를 가리키는 변수 -> UserEntity에서 boards를 어떻게 가져오는지 지정
  // eager: false는 유저를 가져올 때 게시판을 가져오지 않도록 설정
  @ManyToOne((type) => UserEntity, (user) => user.boards, { eager: false })
  user: UserEntity;
}
