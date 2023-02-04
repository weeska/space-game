import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Planet } from './planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {

    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
    ) { }

    createInitialPlanet(user: User) {
        const planet = new Planet();
        planet.user = user;
        planet.name = `${user.name}'s Home`;

        return this.planetsRepository.save(planet);
    }
}
