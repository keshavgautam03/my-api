// // src/auth/auth.service.ts
// import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { UsersService } from '../users/users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class AuthService {
//   private readonly logger = new Logger(AuthService.name);

//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) {
//     // Logging the JWT_SECRET for debugging purposes
//     this.logger.log(`JWT_SECRET: ${this.configService.get<string>('JWT_SECRET')}`);
//   }

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOneByUsername(username);
//     if (user && await bcrypt.compare(pass, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     throw new UnauthorizedException('Invalid credentials');
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async register(createUserDto: CreateUserDto) {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
//     return this.usersService.create({
//       ...createUserDto,
//       password: hashedPassword,
//     });
//   }

//   async validateToken(token: string): Promise<any> {
//     try {
//       return this.jwtService.verify(token);
//     } catch (error) {
//       this.logger.error('Invalid token');
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.logger.log(`JWT_SECRET: ${this.configService.get<string>('JWT_SECRET')}`);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    const user = this.usersService.create({
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
    });
    
    return user;
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error('Invalid token');
      throw new UnauthorizedException('Invalid token');
    }
  }
}
