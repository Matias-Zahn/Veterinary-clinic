import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  //TODO Continuar con los demas servicios

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { date, durationMinutes } = createAppointmentDto;

    const dateMoment = moment(date);

    const dateFormat = dateMoment.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    const conflict = await this.findConflictAppointment(
      dateFormat,
      durationMinutes,
    );

    if (conflict)
      throw new BadRequestException(
        'The doctor already has an appointment assigned to that time',
      );

    const appointment = this.appointmentRepository.create(createAppointmentDto);

    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: string) {
    return id;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  private async findConflictAppointment(
    starTime: string,
    durationMinutes: number = 30,
  ) {
    try {
      const timezone = 'US/Eastern';
      const startMoment = moment(starTime).tz(timezone);

      const endMoment = startMoment.clone().add(durationMinutes, 'minutes');

      const startValidRange = startMoment.clone().subtract(30, 'minutes');

      const conflictAppointments = await this.appointmentRepository.count({
        where: {
          status: 'pending',
          date: Between(startValidRange.toDate(), endMoment.toDate()),
        },
      });

      return conflictAppointments > 0;
    } catch (error) {
      console.log(error);
    }
  }
}
