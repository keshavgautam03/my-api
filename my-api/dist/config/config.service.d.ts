import { ConfigService } from '@nestjs/config';
export declare class SomeService {
    private configService;
    constructor(configService: ConfigService);
    getDatabaseConfig(): void;
}
