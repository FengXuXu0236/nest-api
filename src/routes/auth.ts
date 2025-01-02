import { Routes } from '@nestjs/core'
import { AuthModule } from '../module/auth.module'
/**
 * 鉴权模块路由
 * - 定义鉴权模块的路由路径和模块绑定
 */
export const authRoutes: Routes = [
  {
    path: 'auth',
    module: AuthModule, // 所有 /users 路径下的逻辑由 UserModule 处理
  },
]
