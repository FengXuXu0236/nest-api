import { Module } from '@nestjs/common'
import { PermissionController } from '../controllers/permission.controller'
import { PermissionService } from '../service/permission.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService],
  exports: [PermissionService],
})
export class PermissionModule {}
