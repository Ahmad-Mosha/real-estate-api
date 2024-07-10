import { Module } from '@nestjs/common';
import { S3Service } from './upload.service';
import { S3Controller } from './upload.controller';

@Module({
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class S3Module {}
