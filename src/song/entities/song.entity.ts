import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string; // The Cloudinary URL or local path to the song file

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
