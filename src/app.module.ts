import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';


@Module({
  imports: [AuthModule, UsersModule, ShiftsModule, AssignmentsModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
  AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard, // קודם מאמת את הטוקן ושם user
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard, // אחר כך בודק role על אותו user
  },
]
})

export class AppModule {}
