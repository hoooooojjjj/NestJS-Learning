import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AuthCredentialDto } from '../dto/authCredentailDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    // salt + hash 를 사용하여 사용자의 비밀번호를 암호화해서 저장
    // 비밀번호를 hash 값으로 암호화해서 복호화가 불가능하도록 함
    // 그런데 동일한 값은 항상 동일한 hash 값으로 암호화되기 때문에
    // salt라는 임의의 값을 비밀번호에 더해서 hash로 암호화하면 더 안전함.

    // => bcryptjs 라이브러리가 해당 방법을 통한 암호화를 지원해줌

    // 임의의 salt 생성
    const salt = await bcrypt.genSalt();

    // salt와 비밀번호를 합쳐서 hash 값으로 암호화
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새로운 유저 생성 - 비밀번호는 암호화된 비밀번호를 저장
    const newUser = this.create({
      username,
      password: hashedPassword,
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
  }

  async signin(authCredentialDto: AuthCredentialDto): Promise<boolean> {
    const { username, password } = authCredentialDto;

    // 먼저 username을 통해서 해당하는 사용자를 찾음 -> username은 유니한 값을 가짐
    const foundUserByUserName = await this.findOne({
      where: {
        username,
      },
    });

    // 해당 username을 가진 사용자가 없으면 401 에러
    if (!foundUserByUserName) {
      throw new UnauthorizedException(
        `${username}을 가진 사용자가 존재하지 않습니다.`,
      );
    }

    // 그 다음 해당 user의 암호화된 비밀번호와 넘어온 비밀번호를 비교
    if (await bcrypt.compare(password, foundUserByUserName.password)) {
      return true;
    } else {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }
}
