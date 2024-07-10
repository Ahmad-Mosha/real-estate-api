import { Injectable, ExecutionContext } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerException,
  ThrottlerGenerateKeyFunction,
  ThrottlerGetTrackerFunction,
  ThrottlerOptions,
} from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
    getTracker: ThrottlerGetTrackerFunction,
    generateKey: ThrottlerGenerateKeyFunction,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log('Rate limiting:', {
      ip: req.ip,
      limit,
      ttl,
      headers: req.headers,
    });

    const result = super.handleRequest(
      context,
      limit,
      ttl,
      throttler,
      getTracker,
      generateKey,
    );

    if (!result) {
      console.log('Rate limit exceeded:', {
        ip: req.ip,
        headers: req.headers,
      });
      throw new ThrottlerException('Too many requests');
    }
    return result;
  }
}
