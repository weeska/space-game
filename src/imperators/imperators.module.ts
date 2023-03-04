import { Module } from '@nestjs/common';
import { ImperatorsController } from './imperators.controller';
import { User } from './imperators.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImperatorsService } from './imperators.service';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PlanetsModule],
  providers: [ImperatorsService],
  controllers: [ImperatorsController],
  exports: [ImperatorsService],
})
export class ImperatorsModule { }
