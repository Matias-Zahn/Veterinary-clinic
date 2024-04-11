import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medic } from './entities/medic.entity';
import { Repository } from 'typeorm';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Injectable()
export class MedicService {
  constructor(
    @InjectRepository(Medic)
    private readonly medicRepository: Repository<Medic>,
  ) {}

  async create(createMedicDto: CreateMedicDto) {
    const medic = this.medicRepository.create(createMedicDto);

    await this.medicRepository.save(medic);
  }

  async findAll() {
    const medics = await this.medicRepository.find({
      where: {
        status: true,
      },
    });

    return medics;
  }

  async findOne(id: string) {
    const medic = await this.medicRepository.findOne({
      where: {
        id,
        status: true,
      },
      relations: {
        appointment: true,
      },
    });

    if (!medic) throw new NotFoundException(`Medic with id ${id} not found`);

    return medic;
  }

  async update(id: string, updateMedicDto: UpdateMedicDto) {
    const medic = await this.findOne(id);

    await this.medicRepository.update(medic.id, updateMedicDto);

    return `Medic ${medic.name}' information was updated `;
  }

  async remove(id: string) {
    const medic = await this.findOne(id);

    await this.medicRepository.update(medic.id, {
      status: false,
    });

    return `Medic ${medic.name} has been deleted`;
  }
}
