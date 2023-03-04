


import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { Planet } from './planet.entity';

export interface IResources {
    metal: number;
    crystal: number;
    tritium: number;
}

@Entity()
export class Resources implements IResources {
    @Column()
    metal: number;

    @Column()
    crystal: number;

    @Column()
    tritium: number;

    @PrimaryColumn()
    planetId: number;

    @OneToOne(() => Planet, (planet) => planet.resources)
    planet: Planet;
}
