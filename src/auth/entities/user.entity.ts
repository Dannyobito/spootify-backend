import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
  LISTENER = 'listener',
  ARTIST = 'artist',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.LISTENER, type: 'enum', enum: UserRole })
  role: UserRole; // 'listener', 'artist', 'admin'
}
