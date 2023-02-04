import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { PlanetsModule } from 'src/planets/planets.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PlanetsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
