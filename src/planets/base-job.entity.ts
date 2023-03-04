
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class BaseJob {
  @PrimaryColumn()
  planetId: number;

  @Column()
  start: Date;

  @Column()
  time: number;
}
