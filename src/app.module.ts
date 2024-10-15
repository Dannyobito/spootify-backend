import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SongModule } from './song/song.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { User } from './auth/entities/user.entity';
import { Song } from './song/entities/song.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT'), 10) || 5432,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Song],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider], // Add Cloudinary provider here
})
export class AppModule {}
