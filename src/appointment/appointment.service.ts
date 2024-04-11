import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import * as moment from 'moment-timezone';
import { MedicService } from 'src/medic/medic.service';
import { PetService } from 'src/pet/pet.service';

@Injectable()
export class AppointmentService {
  private TimeZone = 'US/Eastern';
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly medicService: MedicService,
    private readonly petService: PetService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { date, durationMinutes, medicId, petId } = createAppointmentDto;

    const dateFormated = this.formatDate(date);

    const conflict = await this.findConflictAppointment(
      dateFormated,
      durationMinutes,
      medicId,
    );

    if (conflict)
      throw new BadRequestException(
        'The doctor already has an appointment assigned to that time',
      );

    const medic = await this.medicService.findOne(medicId);

    const pet = await this.petService.findOne(petId);

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      medic,
      pet,
    });

    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async findAll() {
    const appointments = await this.appointmentRepository.find();

    return appointments;
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment)
      throw new NotFoundException(`Appointment with id ${id} not found`);

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { date: dateUpdated } = updateAppointmentDto;

    if (!updateAppointmentDto.date) {
      await this.appointmentRepository.update(id, {
        status: 'completed',
      });

      return 'Status completed';
    }

    const newDate = this.formatDate(dateUpdated);

    const conflict = await this.findConflictAppointment(newDate);

    if (conflict)
      throw new ConflictException(
        'The doctor already has an appointment assigned to that time',
      );

    await this.appointmentRepository.update(id, updateAppointmentDto);

    return 'The appointment was rescheduled';
  }

  async remove(id: string) {
    const dateMoment = moment().tz(this.TimeZone);

    const initalMoment = dateMoment.clone().subtract(60, 'minutes').toDate();

    console.log(initalMoment);

    const endMoment = dateMoment.clone().add(60, 'minutes').toDate();

    console.log(endMoment);

    const conflictAppointments = await this.appointmentRepository.findOne({
      where: {
        status: 'pending',
        id,
        date: Between(initalMoment, endMoment),
      },
    });

    if (conflictAppointments)
      throw new ConflictException(
        'To cancel this appointment it is necessary to do so 1 hour in advance',
      );

    await this.appointmentRepository.update(id, {
      status: 'cancelled',
    });

    return 'Appointment has been cancelled';
  }

  private async findConflictAppointment(
    starTime: string,
    durationMinutes: number = 30,
    medicId?: string,
  ) {
    try {
      const startMoment = moment(starTime).tz(this.TimeZone);

      const endMoment = startMoment.clone().add(durationMinutes, 'minutes');

      const startValidRange = startMoment.clone().subtract(30, 'minutes');

      const conflictAppointments = await this.appointmentRepository.count({
        where: {
          medic: { id: medicId },
          status: 'pending',
          date: Between(startValidRange.toDate(), endMoment.toDate()),
        },
      });

      return conflictAppointments > 0;
    } catch (error) {
      console.log(error);
    }
  }

  private formatDate(date: string) {
    const dateMoment = moment(date).tz('US/Eastern');

    const dateFormat = dateMoment.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    return dateFormat;
  }
}
