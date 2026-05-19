import { Injectable } from '@nestjs/common';
import type { ApiHealthResponse } from '@monolith/types';

@Injectable()
export class HealthService {
  getHealth(): ApiHealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api',
    };
  }
}
