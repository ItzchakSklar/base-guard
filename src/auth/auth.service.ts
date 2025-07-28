import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    
    if (username === 'admin' && password === '1234') {
      const payload = { username, role: 'commander' };
      return { access_token: this.jwtService.sign(payload) };
    }
    return { error: 'Invalid credentials' };
  }

  register(username: string, password: string, role: string) {
    const payload = { username, role };
    return { access_token: this.jwtService.sign(payload) };
  }
}