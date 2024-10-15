import { IsNotEmpty } from 'class-validator';

export class CreateSongDto {
  url: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  artist: string;
}
