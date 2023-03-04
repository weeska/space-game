
import { User } from '../imperators/imperators.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Structure } from './structures.entity';
import { Resources } from './resources.entity';
import { Defense } from './defense.entity';
import { Ship } from './fleet.entity';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.planets)
  user: User;

  @OneToMany(() => Structure, (structures) => structures.planet)
  structures: Structure[];

  @OneToMany(() => Ship, (ships) => ships.planet)
  ships: Ship[];

  @OneToMany(() => Defense, (defenses) => defenses.planet)
  defenses: Defense[];

  @OneToOne(() => Resources)
  resources: Resources;
}
