import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entity/propety.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { User } from 'src/users/entity/user.entity';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertyDto } from './dto/search-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';

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
    newProperty.no_of_baths = property.no_of_baths;
    newProperty.no_of_beds = property.no_of_beds;
    newProperty.location = property.location;
    newProperty.user = user;
    return this.propertyRepository.save(newProperty);
  }

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  async findOne(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async findUserProperties(user: User): Promise<Property[]> {
    return this.propertyRepository.find({ where: { user: { id: user.id } } });
  }

  async update(id: string, property: UpdatePropertyDto, user: User) {
    const propertyToUpdate = await this.propertyRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!propertyToUpdate) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepository.save({ ...propertyToUpdate, ...property });
  }

  async delete(id: string, user: User) {
    const propertyToDelete = await this.propertyRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!propertyToDelete) {
      throw new NotFoundException('Property not found');
    }

    return this.propertyRepository.remove(propertyToDelete);
  }

  async filterProperty(
    filterPropertyDto: FilterPropertyDto,
  ): Promise<Property[]> {
    const { baths, beds, price } = filterPropertyDto;
    const query = this.propertyRepository.createQueryBuilder('property');

    if (baths) {
      query.andWhere('property.no_of_baths = :baths', { baths });
    }
    if (beds) {
      query.andWhere('property.no_of_beds = :beds', { beds });
    }
    if (price) {
      query.andWhere('property.price <= :price', { price });
    }

    return query.getMany();
  }

  async searchProperty(
    searchPropertyDto: SearchPropertyDto,
  ): Promise<Property[]> {
    const { title, location } = searchPropertyDto;
    const query = this.propertyRepository.createQueryBuilder('property');

    if (title) {
      query.andWhere('LOWER(property.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }
    if (location) {
      query.andWhere('LOWER(property.location) LIKE LOWER(:location)', {
        location: `%${location}%`,
      });
    }

    return query.getMany();
  }
}
