import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { SongService } from './song.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/cloudinary.provider';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongController {
  constructor(
    private readonly songService: SongService,
    private readonly cloudinary: CloudinaryProvider,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('artist', 'admin')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSong(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSongDto: CreateSongDto,
  ) {
    const uploadResult = await this.cloudinary.uploadFile(file);
    createSongDto.url = uploadResult.url;
    return this.songService.create(createSongDto);
  }

  @Get(':id/stream')
  async streamSong(@Param('id') id: string) {
    return this.songService.stream(id); // This would handle range requests
  }
  @Get()
  async getAllSongs() {
    return this.songService.findAll();
  }
}
