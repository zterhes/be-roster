import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerCreateDTO, PlayerNameAndIdDTO } from './player.dto';
import { Player } from './player.entity';
import { PlayerRespository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRespository)
    private readonly playerRepository: PlayerRespository,
  ) {}

  async createPlayer(createPlayerDTO: PlayerCreateDTO) {
    const result: Player = await this.playerRepository.saveNewPlayer(
      createPlayerDTO,
    );
  }

  async getAllPlayers() {
    return await this.playerRepository.getAll();
  }

  getAllPlayerName() {
    return this.getAllPlayers().then((result) => {
      return PlayerNameAndIdDTO.toPlayerNameAndIdConverter(result);
    });
  }

 
}
