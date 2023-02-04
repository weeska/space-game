import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
