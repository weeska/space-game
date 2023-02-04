import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PlanetsController } from './planets/planets.controller';
import { PlanetsModule } from './planets/planets.module';
import { Planet } from './planets/planet.entity';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User, Planet],
      synchronize: true,
      database: './data.db'
    }),
    UsersModule,
    PlanetsModule
  ],
  controllers: [AppController, PlanetsController, UsersController],
})
export class AppModule {}
