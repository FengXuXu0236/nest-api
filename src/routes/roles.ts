import { Routes } from '@nestjs/core'
import { RoleModule } from '../module/role.module'

/**
 * 角色模块路由
 * - 定义角色模块的路由路径和模块绑定
 */
export const rolesRoutes: Routes = [
  {
    path: 'roles',
    module: RoleModule, // 所有 /users 路径下的逻辑由 RoleModule 处理
  },
]
