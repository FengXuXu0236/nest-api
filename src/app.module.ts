import { Module } from '@nestjs/common'
import { UserModule } from './module/user.module'
import { RouterModule } from '@nestjs/core'
import { routes } from './routes'
import { PrismaModule } from './module/prisma.module'

@Module({
  imports: [
    RouterModule.register(routes), // 注册路由配置
    UserModule,
    PrismaModule
  ],
})
export class AppModule {}
