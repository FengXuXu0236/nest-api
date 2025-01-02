import { Routes } from '@nestjs/core'
import { userRoutes } from './users'
import { authRoutes } from './auth'
import { rolesRoutes } from './roles'
import { permissionRoutes } from './permissions'

/**
 * 汇总所有模块的路由配置
 */
export const routes: Routes = [
  {
    path: 'api',
    children: [
      ...userRoutes,
      ...authRoutes,
      ...rolesRoutes,
      ...permissionRoutes,
    ]
  },
]
