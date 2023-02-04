
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Planet } from './planet.entity';

export const StructureTypes = ["metal_mine", "solar_power_plant"] as const;
export type StructureType = typeof StructureTypes[number];

@Entity()
export class Structure {
  @PrimaryColumn()
  planetId: number;

  @PrimaryColumn()
  name: StructureType;
  
  @ManyToOne(() => Planet, (planet) => planet.structures)
  planet: Planet;
  
  @Column()
  level: number;
}
