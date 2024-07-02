import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entity/propety.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { User } from 'src/users/entity/user.entity';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(property: CreatePropertyDto, user: User): Promise<Property> {
    const newProperty = new Property();
    newProperty.title = property.title;
    newProperty.description = property.description;
    newProperty.price = property.price;
    newProperty.location = property.location;
    newProperty.user = user;
    return this.propertyRepository.save(newProperty);
  }

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  async findOne(id: number): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async update(id: number, property: UpdatePropertyDto, user: User) {
    const propertyToUpdate = await this.propertyRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!propertyToUpdate) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepository.save({ ...propertyToUpdate, ...property });
  }

  async delete(id: number, user: User) {
    const propertyToDelete = await this.propertyRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!propertyToDelete) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepository.remove(propertyToDelete);
  }
}
