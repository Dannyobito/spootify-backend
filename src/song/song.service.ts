import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { StreamableFile } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly httpService: HttpService,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const newSong = this.songRepository.create({
      url: createSongDto.url,
      name: createSongDto.name,
      artist: createSongDto.artist,
    });
    return this.songRepository.save(newSong);
  }

  async stream(id: string): Promise<StreamableFile> {
    const song = await this.songRepository.findOne({ where: { id } });
    const response = await firstValueFrom(
      this.httpService.get(song.url, { responseType: 'stream' }),
    );
    // const file = createReadStream(join(process.cwd(), song.url));
    return new StreamableFile(response.data);
  }
  async findAll() {
    return this.songRepository.find(); // Returns all songs in the database
  }
}
