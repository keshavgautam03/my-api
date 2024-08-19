import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<import("../users/user.entity").User>;
    getProfile(req: any): any;
}
