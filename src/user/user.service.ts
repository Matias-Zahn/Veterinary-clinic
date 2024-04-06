import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;

      const users = await this.userRepository.find({
        take: limit,
        skip: offset,
      });

      return users;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({
        status: true,
        id: id,
      });

      if (!user)
        throw new NotFoundException(`The user with id: ${id} not found`);

      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, updateUserDto);
      return 'User was updated successfully';
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      await this.userRepository.update(id, {
        status: false,
      });
    } catch (error) {
      this.handleErrors(error);
    }
    return 'The user was unsubscribed successfully ';
  }

  private handleErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error.status === 404) throw new NotFoundException(error.message);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Sorry, somenthing has been very wrong 😡',
    );
  }
}
