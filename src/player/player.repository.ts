import { EntityRepository, Repository } from 'typeorm';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRespository extends Repository<Player> {
  test() {
    console.log('PlayerRepo called');
  }

  async saveNewPlayer(entity) {
    const result: Player = await this.save(entity);
    return result;
  }

  async getAll() {
    const result: Player[] = await this.find();
    return result;
  }
}
