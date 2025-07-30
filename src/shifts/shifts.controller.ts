import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { SetMetadata } from '@nestjs/common';


@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getMyShifts(@Request() req) {
        return this.shiftsService.getShiftsForUser(req.user.username);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['commander'])
    @Get()
    getAllShifts() {
        return this.shiftsService.getAllShifts();
    }


    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['commander'])
    createShift(@Body() body: { date: string; hour: string; location: string; assigned_to: string }) {
        return this.shiftsService.createShift(body);
    }
}