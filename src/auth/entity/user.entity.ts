import {
  BaseEntity,
  Column,
  Entity,
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
}
