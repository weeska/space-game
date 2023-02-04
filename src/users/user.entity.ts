
import { Planet } from 'src/planets/planet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Planet, (planet) => planet.user)
  planets: Planet[];
}
