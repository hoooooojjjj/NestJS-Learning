import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardsStatus } from './boards-status-enum';

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

  @Column()
  status: BoardsStatus;
}
