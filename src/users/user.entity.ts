
import { Planet } from 'src/planets/planet.entity';
import { Technology } from 'src/planets/technology.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Planet, (planet) => planet.user)
  planets: Planet[];

  @OneToMany(() => Technology, (technology) => technology.user)
  technologies: Technology[];  
}
