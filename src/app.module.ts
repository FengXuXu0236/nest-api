import { Module } from '@nestjs/common'
import { UserModule } from './module/user.module'
import { AuthModule } from './module/auth.module'
import { RouterModule } from '@nestjs/core'
import { routes } from './routes'
import { PrismaModule } from './module/prisma.module'
import { RoleController } from './controllers/role.controller';
import { RoleService } from './service/role.service';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './service/permission.service';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './service/menu.service';

@Module({
  imports: [
    RouterModule.register(routes), // 注册路由配置
    UserModule,
    AuthModule,
    PrismaModule
  ],
  controllers: [RoleController, PermissionController, MenuController],
  providers: [
    RoleService,
    PermissionService,
    MenuService,
  ],
})
export class AppModule {}
