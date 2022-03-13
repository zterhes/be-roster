import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { PlayerCreateDTO, PlayerDTO } from './player.dto';
import { Player } from './player.entity';
import { PlayerError } from './player.error';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
   async getAllPlayerData() {
    try {
      const result:Player[] = await this.playerService.getAllPlayers();
      return result
    } catch (error) {
      console.log('error', error);
      if (error instanceof PlayerError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('playerNames')
  getAllPlayerName() {
    return this.playerService.getAllPlayerName();
  }

  @Post()
  async createPlayer(
    @Body(new ValidationPipe()) createPlayerDTO: PlayerCreateDTO,
  ) {
    try {
      const result = await this.playerService.createPlayer(createPlayerDTO);
      return result;
    } catch (error) {
      if (error instanceof PlayerError) {
        throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('updatePlayer')
  async updatePlayer(@Body(new ValidationPipe()) playerDTO: PlayerDTO) {
    try {
      const result: UpdateResult = await this.playerService.updatePlayer(
        playerDTO,
      );
      return result;
    } catch (error) {
      if (error instanceof PlayerError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}