import { Module } from '@nestjs/common'
import { UserModule } from './module/user.module'
import { PrismaModule } from './module/prisma.module'

@Module({
  imports: [UserModule, PrismaModule], // 导入 PrismaModule 和 UserModule
})
export class AppModule {}
