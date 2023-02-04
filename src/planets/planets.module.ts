import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure } from './structures.entity';
import { Ship } from './fleet.entity';
import { Resources } from './resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planet, Structure, Resources, Ship])],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
