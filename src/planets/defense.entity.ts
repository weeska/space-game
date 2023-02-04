
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Planet } from './planet.entity';

export const DefenseTypes = ["rocket_launcher", "laser_turret"] as const;
export type DefenseType = typeof DefenseTypes[number];

@Entity()
export class Defense {
  @PrimaryColumn()
  planetId: number;

  @PrimaryColumn()
  name: DefenseType;
  
  @ManyToOne(() => Planet, (planet) => planet.defenses)
  planet: Planet;
  
  @Column()
  amount: number;
}
