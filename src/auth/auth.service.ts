import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async login(username: string, password: string) {

        const user = await this.usersService.validatePassword(username, password);
        if (user) {
            const payload = { username : user.username, role: user.role};
            return { access_token: this.jwtService.sign(payload) };
        }
        return { error: 'Invalid credentials' };
    }

    
    async register(username: string, password: string, role: string) {
        const result = await this.usersService.createUser(username, password, role);
        if (!result || 'error' in result) {
            return result;
        }

        const payload = { username, role };
        return { access_token: this.jwtService.sign(payload) };
    }
}