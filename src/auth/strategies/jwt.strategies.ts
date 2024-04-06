import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt.interface';

export class JwtStrategies extends PassportStrategy(Strategy) {
  async validate(payload: JwtPayload): Promise<User> {
    //TODO RESOLVER HE IMPLEMENTAR LA CARGA Y EXTENSION DEL JWT
    return;
  }
}
