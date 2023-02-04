import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Planet } from './planet.entity';
import { Repository } from 'typeorm';
import { Structure, StructureType } from './structures.entity';
import { Ship, ShipType } from './fleet.entity';
import { Resources } from './resources.entity';

@Injectable()
export class PlanetsService {

    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
        @InjectRepository(Structure)
        private structuresRepository: Repository<Structure>,
        @InjectRepository(Ship)
        private shipsRepository: Repository<Ship>,
        @InjectRepository(Resources)
        private resourcesRepository: Repository<Resources>,          
    ) { }

    async createInitialPlanet(user: User) {
        const planet = new Planet();
        planet.user = user;
        planet.name = `${user.name}'s Home`;

        const resources = new Resources();
        resources.metal = 2500;
        resources.crystal = 1500;
        resources.tritium = 500;
        
        await this.resourcesRepository.save(resources);

        planet.resources = resources;

        return this.planetsRepository.save(planet);
    }

    planets(userId: number) {
        return this.planetsRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }

    resources(planetId: number) {
        return this.resourcesRepository.findOne({
            where: {
                planetId
            }
        });
    }

    structures(planetId: number) {
        return this.structuresRepository.find({
            where: {
                planet: {
                    id: planetId
                }
            }
        });
    }

    ships(planetId: number) {
        return this.shipsRepository.find({
            where: {
                planet: {
                    id: planetId
                }
            }
        });
    }

    async buildStructure(planetId: number, name: StructureType) {
        let structure: Structure | undefined = await this.structuresRepository.findOne({
            where: {
                planet: {
                    id: planetId
                },
                name,
            }
        });

        if(!structure) {
            const planet = await this.planetsRepository.findOne({
                where: {
                    id: planetId
                }
            });

            if(!planet) {
                throw new Error(`planet ${planetId} not found`);
            }
            structure = new Structure();
            structure.planet = planet;
            structure.name = name;
            structure.level = 1;

        } else {
            structure.level++;
        }

        return this.structuresRepository.save(structure);
    }

    async buildShips(planetId: number, name: ShipType, amount: number) {
        let ship: Ship | undefined = await this.shipsRepository.findOne({
            where: {
                planet: {
                    id: planetId
                },
                name,
            }
        });

        if(!ship) {
            const planet = await this.planetsRepository.findOne({
                where: {
                    id: planetId
                }
            });

            if(!planet) {
                throw new Error(`planet ${planetId} not found`);
            }
            ship = new Ship();
            ship.planet = planet;
            ship.name = name;
            ship.amount = amount;

        } else {
            ship.amount += amount;
        }

        return this.shipsRepository.save(ship);
    }
}
