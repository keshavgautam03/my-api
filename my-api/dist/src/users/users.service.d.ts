import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    update(id: number, user: Partial<User>): Promise<void>;
    remove(id: number): Promise<void>;
}
