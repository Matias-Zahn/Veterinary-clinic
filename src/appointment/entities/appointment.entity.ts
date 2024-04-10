import { Pet } from 'src/pet/entities/pet.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('numeric', {
    default: 30,
  })
  durationMinutes: number;

  @Column('text')
  reason: string;

  @Column('enum', {
    enum: ['pending', 'cancelled', 'completed'],
    default: 'pending',
  })
  status: string;

  @ManyToOne(() => Pet, (pet) => pet.appointment, { eager: true })
  pet: Pet;
}
