import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';

// 커스텀 데코레이터 생성
// 데코레이터는 클라이언트 요청 값에 포함되어 반환됨
// createParamDecorator란 파라미터 단에서 사용할 수 있는 데코레이터를 생성하는 함수
// data: 데코레이터에 전달되는 인자
// ctx: 현재 실행 중인 컨텍스트
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    // 현재 실행 중인 컨텍스트를 switchToHttp() 메서드를 사용해서 getRequest() 메서드를 통해 클라이언트 요청 값을 가져옴
    const req = ctx.switchToHttp().getRequest();
    // 클라이언트 요청 값에 포함되어 반환됨
    return req.user;
  },
);
