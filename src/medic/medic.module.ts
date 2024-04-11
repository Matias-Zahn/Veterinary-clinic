import { Module } from '@nestjs/common';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medic } from './entities/medic.entity';

@Module({
  controllers: [MedicController],
  providers: [MedicService],
  imports: [TypeOrmModule.forFeature([Medic])],
  exports: [MedicService],
})
export class MedicModule {}
