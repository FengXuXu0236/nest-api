import { Module } from '@nestjs/common'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../service/user.service'
import { UserRepository } from '../repositories/user.repository'
import { PrismaService } from '../prisma/prisma.service'

/**
 * 用户模块
 * 组织用户相关的控制器、服务和依赖
 */
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService], // 注册 PrismaService
  exports: [UserService] // 导出 UserService，如果需要跨模块使用
})
export class UserModule {}
