import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { Player } from './player.entity';
import { PlayerRespository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
   imports: [TypeOrmModule.forFeature([Player, PlayerRespository])],
   controllers: [PlayerController],
   providers: [PlayerService],
})
export class PlayerModule {}
