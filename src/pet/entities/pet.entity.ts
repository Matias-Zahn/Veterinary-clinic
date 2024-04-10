import { Appointment } from 'src/appointment/entities/appointment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Appointment, (appointment) => appointment.pet)
  appointment: Appointment;

  @BeforeInsert()
  checkUpperCase() {
    this.name = this.name.toLowerCase();
  }
}
