import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertyDto } from './dto/search-property.dto';
import { Property } from './entity/propety.entity';
import { FilterPropertyDto } from './dto/filter-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertyService: PropertiesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  async create(@Body() property: CreatePropertyDto, @GetUser() user: any) {
    return this.propertyService.create(property, user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Get('user/properties')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  async findUserProperties(@GetUser() user: any) {
    return this.propertyService.findUserProperties(user);
  }

  @Get('filter')
  filterProperty(
    @Query() filterPropertyDto: FilterPropertyDto,
  ): Promise<Property[]> {
    return this.propertyService.filterProperty(filterPropertyDto);
  }

  @Get('search')
  searchProperty(
    @Query() searchPropertyDto: SearchPropertyDto,
  ): Promise<Property[]> {
    return this.propertyService.searchProperty(searchPropertyDto);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  async update(
    @Param('id') id: string,
    @Body() property: UpdatePropertyDto,
    @GetUser() user: any,
  ) {
    return this.propertyService.update(id, property, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  async delete(@Param('id') id: string, @GetUser() user: any) {
    return this.propertyService.delete(id, user);
  }
}
