
import { User } from '../users/user.entity';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

export const TechnologyTypes = ["armor", "shields", "weapons"] as const;
export type TechnologyType = typeof TechnologyTypes[number];

@Entity()
export class Technology {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  name: TechnologyType;
  
  @ManyToOne(() => User, (user) => user.technologies)
  user: User;
  
  @Column()
  level: number;
}
