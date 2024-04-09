import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('enum', {
    enum: ['cat', 'dog'],
  })
  specie: string;

  @Column('text')
  race: string;

  @Column('date', {
    nullable: true,
  })
  birthdate: string;

  @Column('text', {
    nullable: true,
  })
  photo: string;

  @Column('bool', {
    default: true,
  })
  status: boolean;

  @ManyToOne(() => User, (user) => user.pet, { eager: true })
  user: User;

  @BeforeInsert()
  checkUpperCase() {
    this.name = this.name.toLowerCase();
  }
}
