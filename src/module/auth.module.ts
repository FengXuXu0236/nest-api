import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../guards/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '../service/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { UserService } from '../service/user.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // JWT 密钥
      signOptions: { expiresIn: '1h' }, // Token 过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy],
  exports: [AuthService], // 导出 AuthService 以便其他模块使用
})
export class AuthModule {}
