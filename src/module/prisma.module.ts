import { Global, Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Global() // 设置为全局模块，无需在每个模块中重复导入
@Module({
  providers: [PrismaService], // 注册 PrismaService 为提供者
  exports: [PrismaService]    // 导出 PrismaService 供其他模块使用
})
export class PrismaModule {}
