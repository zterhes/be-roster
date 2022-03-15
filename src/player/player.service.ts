import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { drive } from 'googleapis/build/src/apis/drive';
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
    private googleDriveService: GoogleDriveService,
  ) {}

  async getAllPlayers() {
    const playersList: Player[] = await this.playerRepository.find();
    if (playersList.length === 0) {
      throw new PlayerError('There are no player entities in the database');
    }
    return playersList;
  }

  async getAllPlayerName() {
    const playersList = await this.getAllPlayers();
    if (playersList.length === 0) {
      throw new PlayerError('There are no player entities in the database');
    }
    return PlayerNameAndIdDTO.toPlayerNameAndIdConverter(playersList);
  }

  async createPlayer(
    createPlayerDTO: PlayerCreateDTO,
    file: Express.Multer.File,
  ) {
    const newPlayer: Player = new Player();
    newPlayer.name = createPlayerDTO.name;
    newPlayer.imgID = createPlayerDTO.imgSrc =
      process.env.DEFAULT_PLAYER_IMG_PATH;
    const result: Player = await this.playerRepository.save(newPlayer);
    if (result === undefined) {
      throw new PlayerError('Saving is unsuccessful');
    }
    try {
      const driveUploadResult = await this.googleDriveService.upload(
        result.id,
        file,
      );
      const playerDTO = new PlayerDTO();
      playerDTO.id = result.id;
      playerDTO.name = result.name;
      playerDTO.imgID = driveUploadResult.data.id;
      const updateResult = await this.updatePlayer(playerDTO);
      if (updateResult.affected!=1){
        throw new PlayerError("Error saving imgId to the database")
      }
    } catch (error) {
      console.log('error', error.message);
      throw new PlayerError(error.message);
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
