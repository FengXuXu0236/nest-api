import { Routes } from '@nestjs/core'
import { RoleModule } from '../module/role.module'

/**
 * 用户模块路由
 * - 定义用户模块的路由路径和模块绑定
 */
export const rolesRoutes: Routes = [
  {
    path: 'roles',
    module: RoleModule, // 所有 /users 路径下的逻辑由 RoleModule 处理
  },
]
