import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from '../config/config.service';
import { PlayerModule } from 'src/player/player.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PlayerModule,
    GoogleDriveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
