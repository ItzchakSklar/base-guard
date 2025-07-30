import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Public } from './public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(
        @Body() body: { username: string; password: string },
        @Res() res: Response
    ) {
        const result = await this.authService.login(body.username, body.password);
        if ('access_token' in result) {
            res.setHeader('Authorization', `Bearer ${result.access_token}`);
            return res.status(200).json({ msg: 'The token is in the headers' });
        }
        return res.status(401).json(result);
    }


    @Public()
    @Post('register')
    async register(@Body() body: { username: string; password: string; role: string }) {
        return await this.authService.register(body.username, body.password, body.role);
    }
}
