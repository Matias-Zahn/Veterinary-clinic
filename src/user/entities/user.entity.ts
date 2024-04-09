import { Pet } from 'src/pet/entities/pet.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('numeric', {
    unique: true,
  })
  dni: number;

  @Column('text')
  password: string;

  @Column('enum', {
    enum: ['male', 'female', 'other'],
  })
  genre: string;

  @Column('date', {
    nullable: true,
  })
  passwordChangedAt: string;

  @Column('enum', {
    enum: ['developer', 'client'],
    default: 'client',
  })
  role: string;

  @Column('bool', {
    default: true,
  })
  status: boolean;

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet;

  @BeforeInsert()
  checkUpperCase() {
    this.name = this.name.toLowerCase();
    this.surname = this.surname.toLowerCase();
  }
}
