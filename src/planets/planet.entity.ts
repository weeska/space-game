
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Structure } from './structures.entity';
import { Resources } from './resources.entity';

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

  @OneToOne(() => Resources)
  resources: Resources;
}
