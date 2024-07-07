import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configSerive.getOrThrow('AWS_REGION'),
  });

  constructor(private configSerive: ConfigService) {}

  async uploadFile(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'mosha-bucket',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
