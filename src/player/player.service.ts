import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { UpdateResult } from 'typeorm';
import { PlayerCreateDTO, PlayerDTO, PlayerNameAndIdDTO } from './player.dto';
import { Player } from './player.entity';
import { PlayerError } from './player.error';
import { PlayerRespository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRespository)
    private readonly playerRepository: PlayerRespository,
    private googleDriveService : GoogleDriveService
  ) {}

  async getAllPlayers() {
    const playersList: Player[] = await this.playerRepository.find();
    if (playersList.length === 0) {
      throw new PlayerError('There are no player entities in the database');
    }
    return playersList;
  }

  async getAllPlayerName() {
    this.googleDriveService.upload()
    const playersList = await this.getAllPlayers();
    if (playersList.length === 0) {
      throw new PlayerError('There are no player entities in the database');
    }
    return PlayerNameAndIdDTO.toPlayerNameAndIdConverter(playersList);
  }

  async createPlayer(createPlayerDTO: PlayerCreateDTO) {
    const newPlayer: Player = new Player();
    newPlayer.name = createPlayerDTO.name;
    newPlayer.imgSrc =
      createPlayerDTO.imgSrc != null ? createPlayerDTO.imgSrc : 'default';
    const result: Player = await this.playerRepository.save(newPlayer);
    console.log('result', result);
    if (result === undefined) {
      throw new PlayerError('Saving is unsuccessful');
    }
    return result.id;
  }

  async updatePlayer(playerDTO: PlayerDTO) {
    const result: UpdateResult = await this.playerRepository.update(
      playerDTO.id,
      playerDTO,
    );
    if (result.affected === 0) {
      throw new PlayerError(
        'Update with ' + playerDTO.id + ' has affected 0 entities',
      );
    }
    return result;
  }
}
