import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entity/propety.entity';
import { UsersModule } from 'src/users/users.module';
import { S3Module } from 'src/s3/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), UsersModule, S3Module],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
