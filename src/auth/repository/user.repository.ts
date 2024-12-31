import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AuthCredentialDto } from '../dto/authCredentailDto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    const { username, password } = authCredentialDto;

    // 새로운 유저 생성
    const newUser = this.create({
      username,
      password,
    });

    // 데이터를 처리할 때 에러 코드를 커스터마이징하기 위해선 try catch 문을 사용해야 함
    try {
      // 유저 생성 저장
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${newUser}은 이미 존재하는 아이디입니다`);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return newUser;
  }
}
