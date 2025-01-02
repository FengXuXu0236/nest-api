import { Routes } from '@nestjs/core'
import { PermissionModule } from '../module/permission.module'

/**
 * 权限模块路由
 * - 定义权限模块的路由路径和模块绑定
 */
export const permissionRoutes: Routes = [
  {
    path: 'permissions',
    module: PermissionModule,
  },
]
