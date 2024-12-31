import { Routes } from '@nestjs/core'
import { userRoutes } from './users'

/**
 * 汇总所有模块的路由配置
 */
export const routes: Routes = [
  {
    path: 'api',
    children: [
      ...userRoutes,
    ]
  },
]
