import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', {
    unique: true,
  })
  dni: number;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text', {
    array: true,
  })
  speciality: string[];

  @Column('bool', {
    default: true,
  })
  status: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.medic)
  appointment: Appointment;
}
