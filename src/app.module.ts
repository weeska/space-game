import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { ImperatorsModule } from './imperators/imperators.module';
import { User } from './imperators/imperators.entity';
import { PlanetsController } from './planets/planets.controller';
import { PlanetsModule } from './planets/planets.module';
import { Planet } from './planets/planet.entity';
import { ImperatorsController } from './imperators/imperators.controller';
import { Structure } from './planets/structures.entity';
import { Ship } from './planets/fleet.entity';
import { Resources } from './planets/resources.entity';
import { Defense } from './planets/defense.entity';
import { Technology } from './planets/technology.entity';
import { ResearchJob } from './planets/research-job.entity';
import { StructureJob } from './planets/structure-job.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load: [configuration],
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [Defense, User, Planet, Structure, Resources, Resources, Ship, Technology, ResearchJob, StructureJob],
      synchronize: true,
      database: './data.db'
    }),
    ImperatorsModule,
    PlanetsModule
  ],
  controllers: [AppController, PlanetsController, ImperatorsController],
})
export class AppModule {
}
