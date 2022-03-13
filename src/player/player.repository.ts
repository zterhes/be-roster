import { EntityRepository, Repository } from 'typeorm';
import { PlayerDTO } from './player.dto';
import { Player } from './player.entity';
import { PlayerError } from './player.error';

@EntityRepository(Player)
export class PlayerRespository extends Repository<Player> {
  test() {
    console.log('PlayerRepo called');
  }
}
