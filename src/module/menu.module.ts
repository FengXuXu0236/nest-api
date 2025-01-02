import { Module } from '@nestjs/common'
import { MenuController } from '../controllers/menu.controller'
import { MenuService } from '../service/menu.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
  exports: [MenuService],
})
export class MenuModule {}
