import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { MedicModule } from 'src/medic/medic.module';
import { PetModule } from 'src/pet/pet.module';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [MedicModule, PetModule, TypeOrmModule.forFeature([Appointment])],
})
export class AppointmentModule {}
