import { Module } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { UserService } from '../service/user.service'
import { PrismaService } from '../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // JWT 密钥
      signOptions: { expiresIn: '1h' }, // Token 过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
