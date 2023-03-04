
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './imperators.entity';

@Injectable()
export class ImperatorsService {
    constructor(
        @InjectRepository(User)
        private imperatorsRepository: Repository<User>,
    ) { }

    async create(name: string): Promise<User> {
        const user = new User();
        user.name = name;

        return this.imperatorsRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.imperatorsRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.imperatorsRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.imperatorsRepository.delete(id);
    }
}