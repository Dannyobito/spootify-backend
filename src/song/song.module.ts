import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { Song } from './entities/song.entity';
import { CloudinaryProvider } from '../cloudinary.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), HttpModule],
  controllers: [SongController],
  providers: [SongService, CloudinaryProvider],
})
export class SongModule {}
