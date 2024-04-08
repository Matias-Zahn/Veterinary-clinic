import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { JwtStrategies } from './strategies/jwt.strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [JwtStrategies],
  imports: [UserModule, ConfigModule],
  exports: [JwtStrategies],
})
export class AuthModule {}
