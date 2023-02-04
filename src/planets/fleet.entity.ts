
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Planet } from './planet.entity';

export const ShipTypes = ["light_fighter", "heavy_fighter", "small_transporter", "medium_transporter", "large_transporter"] as const;
export type ShipType = typeof ShipTypes[number];

@Entity()
export class Ship {
  @PrimaryColumn()
  planetId: number;

  @PrimaryColumn()
  name: ShipType;
  
  @ManyToOne(() => Planet, (planet) => planet.structures)
  planet: Planet;
  
  @Column()
  amount: number;
}
