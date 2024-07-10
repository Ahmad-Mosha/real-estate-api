import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entity/propety.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { User } from 'src/users/entity/user.entity';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertyDto } from './dto/search-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { S3Service } from 'src/s3/upload.service';
import { GetPropertiesDto } from './dto/pagination-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private s3Service: S3Service,
  ) {}

  async create(
    property: CreatePropertyDto,
    user: User,
    file: Express.Multer.File,
  ): Promise<Property> {
    const newProperty = new Property();
    newProperty.title = property.title;
    newProperty.description = property.description;
    newProperty.price = property.price;
    newProperty.no_of_baths = property.no_of_baths;
    newProperty.no_of_beds = property.no_of_beds;
    newProperty.location = property.location;
    newProperty.user = user;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      await this.s3Service.uploadFile(fileName, file.buffer);
      newProperty.imageUrl = `https://mosha-bucket.s3.amazonaws.com/${fileName}`;
    }

    return this.propertyRepository.save(newProperty);
  }

  async findAll(getPropertiesDto: GetPropertiesDto): Promise<any> {
    const { page, limit } = getPropertiesDto;
    const [result, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: limit * (page - 1),
      // Add any other conditions or relations here
    });

    return {
      data: result,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async findUserProperties(user: User): Promise<Property[]> {
    return this.propertyRepository.find({ where: { user: { id: user.id } } });
  }

  // implement the update method with image upload
  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    user: User,
    file: Express.Multer.File,
  ): Promise<Property> {
    const propertyToUpdate = await this.propertyRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!propertyToUpdate) {
      throw new NotFoundException('Property not found');
    }

    propertyToUpdate.title = updatePropertyDto.title;
    propertyToUpdate.description = updatePropertyDto.description;
    propertyToUpdate.price = updatePropertyDto.price;
    propertyToUpdate.no_of_baths = updatePropertyDto.no_of_baths;
    propertyToUpdate.no_of_beds = updatePropertyDto.no_of_beds;
    propertyToUpdate.location = updatePropertyDto.location;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      await this.s3Service.uploadFile(fileName, file.buffer);
      propertyToUpdate.imageUrl = `https://mosha-bucket.s3.amazonaws.com/${fileName}`;
    }

    return this.propertyRepository.save(propertyToUpdate);
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

    // Dynamically add conditions based on provided DTO
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

    try {
      const properties = await query.getMany();
      return properties;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Failed to search properties:', error);
      // Consider throwing a more specific error or handling it as per your application's error handling strategy
      throw new Error('Failed to execute property search');
    }
  }
}
