
import { Entity, Column } from 'typeorm';
import { BaseJob } from './base-job.entity';
import { TechnologyType } from './technology.entity';

@Entity()
export class ResearchJob extends BaseJob {
  @Column()
  name: TechnologyType;
}
