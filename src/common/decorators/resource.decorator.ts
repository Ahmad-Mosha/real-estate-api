// src/common/decorators/resource.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Resource = (service: string, ownershipField: string) =>
  SetMetadata('resource', { service, ownershipField });
