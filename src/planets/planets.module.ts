import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure } from './structures.entity';
import { Ship } from './fleet.entity';
import { Resources } from './resources.entity';
import { Defense } from './defense.entity';
import { Technology } from './technology.entity';
import { StructureJob } from './structure-job.entity';
import { ResearchJob } from './research-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Defense, Planet, Structure, Resources, Ship, Technology, StructureJob, ResearchJob])],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
