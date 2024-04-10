import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto, user: User) {
    try {
      const pet = this.petRepository.create({
        ...createPetDto,
        user,
      });

      await this.petRepository.save(pet);

      return { pet, user };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const pets = await this.petRepository.find({
      where: {
        status: true,
      },
    });

    return pets;
  }

  async findOne(id: string) {
    const pet = await this.petRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!pet) throw new NotFoundException('Pet not found');

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    await this.petRepository.update(id, updatePetDto);

    return 'Pet has been updated successfully';
  }

  async remove(id: string) {
    await this.petRepository.update(id, {
      status: false,
    });

    return 'Pet has been deleted';
  }
}
