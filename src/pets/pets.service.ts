import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    // newPet = new Pet; newPet.name = ...;
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet); // INSERT
  }

  async findAll(): Promise<Pet[]> {
    // SELECT * pet
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail(id);
  }
}
