
import { Entity, Column } from 'typeorm';
import { StructureType } from './structures.entity';
import { BaseJob } from './base-job.entity';

@Entity()
export class StructureJob extends BaseJob {
  @Column()
  target: StructureType;
}
