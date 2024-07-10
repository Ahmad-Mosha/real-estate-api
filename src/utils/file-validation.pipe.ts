import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common/pipes';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    if (!value) {
      throw new BadRequestException('File is required');
    }

    const fileTypeValidator = new FileTypeValidator({
      fileType: /image\/(png|jpeg|jpg)/,
    });

    fileTypeValidator.isValid(value);

    const maxFileSizeValidator = new MaxFileSizeValidator({ maxSize: 1000000 });
    maxFileSizeValidator.isValid(value);

    return value;
  }
}
