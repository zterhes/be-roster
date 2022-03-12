import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, UUIDVersion } from 'class-validator';
import { Player } from './player.entity';

export class PlayerCreateDTO {
  @ApiProperty({
    description: SwaggerMessages.playerNameDescription,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: SwaggerMessages.playerImgDescription,
  })
  imgSrc: string;
}

export class PlayerNameAndIdDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public static toPlayerNameAndIdConverter = (playerResultList: Player[]) => {
    const result = playerResultList.map((player: Player) => {
      return new PlayerNameAndIdDTO(player.id, player.name);
    });
    return result;
  };
}

export class PlayerDTO {
  @ApiProperty({
    description: SwaggerMessages.playerIdDescription,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: SwaggerMessages.playerNameDescription,
  })
  name: string;

  @ApiProperty({
    description: SwaggerMessages.playerImgDescription,
  })
  imgSrc: string;
}
