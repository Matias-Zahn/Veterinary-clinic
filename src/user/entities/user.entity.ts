import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('bool', {
    default: true,
  })
  status: boolean;
}
