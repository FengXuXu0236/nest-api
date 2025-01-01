import { Module } from '@nestjs/common'
import { RoleController } from '../controllers/role.controller'
import { RoleService } from '../service/role.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
})
export class RoleModule {}
