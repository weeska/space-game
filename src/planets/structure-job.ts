
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { StructureType } from './structures.entity';

@Entity()
export class StructureJob {
  @PrimaryColumn()
  planetId: number;

  @Column()
  target: StructureType;
  
  @Column()
  start: Date;

  @Column()
  time: number;
}
