import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../imperators/imperators.entity';
import { Planet } from './planet.entity';
import { Repository } from 'typeorm';
import { Structure, StructureType } from './structures.entity';
import { Ship, ShipType } from './fleet.entity';
import { Resources } from './resources.entity';
import { Defense, DefenseType } from './defense.entity';
import { Technology, TechnologyType } from './technology.entity';
import { StructureJob } from './structure-job.entity';
import { ResearchJob } from './research-job.entity';

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
        @InjectRepository(Structure)
        private structuresRepository: Repository<Structure>,
        @InjectRepository(Ship)
        private shipsRepository: Repository<Ship>,
        @InjectRepository(Defense)
        private defensesRepository: Repository<Defense>,        
        @InjectRepository(Resources)
        private resourcesRepository: Repository<Resources>,
        @InjectRepository(Technology)
        private technologiesRepository: Repository<Technology>,        
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

    structureJob(planetId: number) {
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

    defenses(planetId: number) {
        return this.defensesRepository.find({
            where: {
                planet: {
                    id: planetId
                }
            }
        });
    }

    technologies(userId: number) {
        return this.technologiesRepository.find({
            where: {
                userId,
            }
        });
    }

    async buildStructure(planetId: number, name: StructureType): Promise<StructureJob> {
        const job = new StructureJob();
        job.time = 10; 
        job.planetId = planetId;
        job.start = new Date();
        job.target = name;

        //save job
        setTimeout(async () => this.onStructureFinished(job), job.time);

        return job;
    }

    async onStructureFinished(job: StructureJob) {
        const planet = await this.planetsRepository.findOne({
            where: {
                id: job.planetId
            }
        });

        if(!planet) {
            throw new Error(`planet ${job.planetId} not found`);
        }

        let structure: Structure | undefined = await this.structuresRepository.findOne({
            where: {
                planet: {
                    id: job.planetId
                },
                name: job.target,
            }
        });
        if(!structure) {
            structure = new Structure();
            structure.planet = planet;
            structure.name = job.target;
            structure.level = 1;
            
        } else {
            structure.level++;
        }     
        await this.structuresRepository.save(structure);
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

    async buildDefenses(planetId: number, name: DefenseType, amount: number) {
        let defense: Defense | undefined = await this.defensesRepository.findOne({
            where: {
                planet: {
                    id: planetId
                },
                name,
            }
        });

        if(!defense) {
            const planet = await this.planetsRepository.findOne({
                where: {
                    id: planetId
                }
            });

            if(!planet) {
                throw new Error(`planet ${planetId} not found`);
            }
            defense = new Defense();
            defense.planet = planet;
            defense.name = name;
            defense.amount = amount;

        } else {
            defense.amount += amount;
        }

        return this.defensesRepository.save(defense);
    }

    async researchTechnology(planetId: number, name: TechnologyType) {
        const planet = await this.planetsRepository.findOne({
            where: {
                id: planetId
            },
            relations: {
                user: true,
            }
        });
        if(!planet) {
            throw new Error(`planet ${planetId} not found`);
        }
        
        const job = new ResearchJob();
        job.time = 10; 
        job.planetId = planetId;
        job.start = new Date();
        job.target = name;

        //save job
        setTimeout(async () => this.onResearchFinished(job), job.time);

        return job;
    }

    async onResearchFinished(job: ResearchJob) {
        const planet = await this.planetsRepository.findOne({
            where: {
                id: job.planetId
            },
            relations: {
                user: true,
            }
        });

        if(!planet) {
            throw new Error(`planet ${job.planetId} not found`);
        }

        let tech: Technology | undefined = await this.technologiesRepository.findOne({
            where: {
                userId: planet.user.id,
                name: job.target,
            }
        });

        if(!tech) {
            tech = new Technology();
            tech.name = job.target;
            tech.level = 1;
            tech.userId = planet.user.id;

        } else {
            tech.level++;
        }

        await this.technologiesRepository.save(tech);
    }
}
