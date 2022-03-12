import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PlayerCreateDTO, PlayerDTO } from './player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  getAllPlayerData() {
    return this.playerService.getAllPlayers();
  }

  @Get('playerNames')
  getAllPlayerName() {
    return this.playerService.getAllPlayerName();
  }

  @Post('newPlayer')
  createPlayer(@Body(new ValidationPipe()) createPlayerDTO: PlayerCreateDTO) {
    return this.playerService.createPlayer(createPlayerDTO);
  }

  @Put('updatePlayer')
  updatePlayer(@Body(new ValidationPipe()) playerDTO: PlayerDTO) {
    
  }
}
