import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
    validateToken(token: string): Promise<any>;
}
