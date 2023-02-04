


import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { Structure } from './structures.entity';
import { Planet } from './planet.entity';

@Entity()
export class Resources {
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
