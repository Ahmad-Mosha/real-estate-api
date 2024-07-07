import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/users/entity/user.entity';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertyService: PropertiesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({
            fileType: /image\/(png|jpeg|jpg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createPropertyDto: CreatePropertyDto,
    @GetUser() user: User,
  ) {
    return this.propertyService.create(createPropertyDto, user, file);
  }

  @Get('search')
  searchProperty(
    @Query() searchPropertyDto: SearchPropertyDto,
  ): Promise<Property[]> {
    console.log('searchPropertyDto:', searchPropertyDto);
    return this.propertyService.searchProperty(searchPropertyDto);
  }

  @Get('filter')
  filterProperty(
    @Query() filterPropertyDto: FilterPropertyDto,
  ): Promise<Property[]> {
    return this.propertyService.filterProperty(filterPropertyDto);
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
