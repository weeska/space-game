import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PlanetsController } from './planets/planets.controller';
import { PlanetsModule } from './planets/planets.module';
import { Planet } from './planets/planet.entity';
import { UsersController } from './users/users.controller';
import { Structure } from './planets/structures.entity';
import { Ship } from './planets/fleet.entity';
import { Resources } from './planets/resources.entity';
import { Defense } from './planets/defense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [Defense, User, Planet, Structure, Resources, Resources, Ship],
      synchronize: true,
      database: './data.db'
    }),
    UsersModule,
    PlanetsModule
  ],
  controllers: [AppController, PlanetsController, UsersController],
})
export class AppModule {}
