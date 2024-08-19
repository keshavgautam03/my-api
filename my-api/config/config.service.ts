import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    // ... other database configs
  }
}
